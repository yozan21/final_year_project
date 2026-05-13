import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import Booking from "../models/BookingModel.js";
import * as handlerFactory from "./handlerFactory.js";
import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";

// Multer setup (memory storage, image-only)
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

// Single image: field name should be 'transactionScreenshot'
export const uploadBookingScreenshot = upload.single("transactionScreenshot");

export const uploadToCloudinary = asyncHandler(async (req, res, next) => {
  if (!req.file)
    return next(new AppError("Payment screenshot is required", 400));

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "bookings/screenshots",
          resource_type: "image",
        },
        (err, result) => (err ? reject(err) : resolve(result))
      )
      .end(req.file.buffer);
  });

  // Persist URL in the expected schema field
  req.body.transactionScreenshot = result.secure_url;
  next();
});

export const getAllBookings = handlerFactory.getAll(Booking);
export const getBooking = handlerFactory.getOne(Booking);
export const createBooking = handlerFactory.createOne(Booking);
export const updateBooking = handlerFactory.updateOne(Booking);
export const deleteBooking = handlerFactory.deleteOne(Booking);
