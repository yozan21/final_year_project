import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import Room from "../models/RoomModel.js";
import * as handlerFactory from "./handlerFactory.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("File type not supported! Please insert images only.", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadRoomImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images" },
]);

export const rollbackThumbnail = async (thumbnail) => {
  try {
    await cloudinary.uploader.destroy(thumbnail.public_id);
  } catch (err) {
    console.error("Error rolling back thumbnails:", err.message);
  }
};

// rollback images (multiple)
export const rollbackImages = async (images = []) => {
  try {
    await Promise.all(
      images.map(async (img) => {
        await cloudinary.uploader.destroy(img.public_id);
      })
    );
  } catch (err) {
    console.error("Error rolling back images:", err.message);
  }
};

export const resizeUploadedRoomImages = asyncHandler(async (req, res, next) => {
  if (
    !req.files.thumbnail ||
    !req.files.images ||
    req.files.images.length === 0
  )
    return next(
      new AppError("Thumbnail and at least one image is required!", 400)
    );
  // 1️⃣ Upload and resize thumbnail
  const thumbnailResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "rooms/thumbnail",
          resource_type: "image",
          transformation: [
            { width: 500, height: 500, crop: "fill" }, // resize thumbnail to 500x500
          ],
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      )
      .end(req.files.thumbnail[0].buffer);
  });

  req.body.thumbnail = {
    url: thumbnailResult.secure_url,
    public_id: thumbnailResult.public_id,
  };
  req.rollbackThumbnail = async () =>
    await rollbackThumbnail(req.body.thumbnail);

  // 2️⃣ Upload and resize multiple images
  const imagesPromises = req.files.images.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "rooms/gallery",
            resource_type: "image",
            transformation: [
              { width: 1000, height: 800, crop: "limit" }, // resize images to max 1000x800
            ],
          },
          (err, result) => {
            if (err) return reject(err);
            resolve({ url: result.secure_url, public_id: result.public_id });
          }
        )
        .end(file.buffer);
    });
  });

  req.body.images = await Promise.all(imagesPromises);
  req.rollbackImages = async () => await rollbackImages(req.body.images);

  next();
});

export const updateRoomImages = asyncHandler(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  if (!room) return next(new AppError("Room not found", 404));

  // --- 1️⃣ Handle deleted images ---
  if (req.body.deletedImages) {
    // Delete images from Cloudinary
    let { deletedImages } = req.body;
    if (typeof deletedImages === "string") {
      try {
        deletedImages = JSON.parse(deletedImages);
      } catch (e) {
        deletedImages = [deletedImages]; // fallback: wrap single string into array
      }
    }

    const deletePromises = deletedImages.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);

    // Remove deleted images from room.images array
    room.images = room.images.filter(
      (img) => !deletedImages.includes(img.public_id)
    );
  }

  // --- 2️⃣ Handle thumbnail update ---
  if (req.files?.thumbnail) {
    // Delete old thumbnail if exists
    if (room.thumbnail?.public_id) {
      await cloudinary.uploader.destroy(room.thumbnail.public_id);
    }

    // Upload new thumbnail
    const thumbnailResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "rooms/thumbnail",
            resource_type: "image",
            transformation: [{ width: 500, height: 500, crop: "fill" }],
          },
          (err, result) => (err ? reject(err) : resolve(result))
        )
        .end(req.files.thumbnail[0].buffer);
    });

    req.body.thumbnail = {
      url: thumbnailResult.secure_url,
      public_id: thumbnailResult.public_id,
    };
  }

  // --- 3️⃣ Handle new gallery images ---
  if (req.files?.images?.length) {
    const uploadPromises = req.files.images.map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "rooms/gallery",
                resource_type: "image",
                transformation: [{ width: 1000, height: 800, crop: "limit" }],
              },
              (err, result) =>
                err
                  ? reject(err)
                  : resolve({
                      url: result.secure_url,
                      public_id: result.public_id,
                    })
            )
            .end(file.buffer);
        })
    );

    const newUploadedImages = await Promise.all(uploadPromises);

    // Merge new images with existing ones (after deletion)
    req.body.images = [...(room.images || []), ...newUploadedImages];
  } else {
    // No new images, keep the existing array
    req.body.images = room.images || [];
  }

  next();
});

export const deleteRoomImages = async (room, next) => {
  if (!room) return next(new AppError("Room not found", 404));

  //1. Delete thumbnail
  await cloudinary.uploader.destroy(room.thumbnail.public_id);

  // 2. Delete Images
  const deletePromises = room.images.map((img) =>
    cloudinary.uploader.destroy(img.public_id)
  );
  await Promise.all(deletePromises);
};

export const getLandlordId = (req, res, next) => {
  req.body.landlordId = req.user._id;
  next();
};

// export const getRoomDetails = handlerFactory.getOne(Room, {
//   path: "landlord",
//   select: "-__v -changedPasswordAt -role",
//   populate: {
//     path: "totalListing",
//   },
// });
export const getRoomDetails = asyncHandler(async (req, res, next) => {
  let query =
    req.user.role === "client"
      ? Room.findOneAndUpdate(
          { _id: req.params.id, status: "active" },
          { $inc: { views: 1 } }
        )
      : Room.findById(req.params.id);
  const doc = await query.populate({
    path: "landlord",
    select: "-__v -changedPasswordAt -role",
    populate: {
      path: "totalListings",
    },
  });

  if (!doc) return next(new AppError("No document found with that ID", 400));

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

export const updateRoomStatus = asyncHandler(async (req, res, next) => {
  let doc;
  console.log(req.body);
  if (req.user.role === "landlord") {
    doc = await Room.findOneAndUpdate(
      { _id: req.params.id, landlordId: req.user.id, status: "booked" },
      { status: "active", availableFrom: Date.now() },
      { new: true, runValidators: true }
    );
  } else {
    doc = await Room.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        availableFrom: Date.now(),
      },
      { new: true, runValidators: true }
    );
  }

  if (!doc) return next(new AppError("No document found with that ID", 400));

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

export const getFeatured = asyncHandler(async (req, res, next) => {
  const doc = await Room.aggregate([
    { $match: { status: "active" } }, // only active rooms
    // 1️⃣ Lookup landlord details
    {
      $lookup: {
        from: "users",
        localField: "landlordId",
        foreignField: "_id",
        as: "landlord",
      },
    },
    { $unwind: "$landlord" },
    {
      $addFields: {
        score: {
          $add: [
            { $multiply: ["$landlord.likes", 0.6] },
            { $multiply: ["$views", 0.4] },
          ],
        },
      },
    },
    { $sort: { score: -1 } },
    { $limit: 3 },

    // 6️⃣ Optionally project only needed fields
    {
      $project: {
        title: 1,
        thumbnail: 1,
        location: 1,
        area: 1,
        type: 1,
        availableFrom: 1,
        price: 1,
        landlord: {
          name: 1,
          likes: 1,
          avatar: 1,
        },
      },
    },
  ]);

  if (!doc) return next(new AppError("No any rooms are featured", 400));

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

export const getAllRooms = handlerFactory.getAll(Room);

export const createRoom = handlerFactory.createOne(Room);

export const updateRoom = handlerFactory.updateOne(Room);

export const deleteRoom = handlerFactory.deleteOne(Room);
