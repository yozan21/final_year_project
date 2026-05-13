import asyncHandler from "express-async-handler";
import AppError from "../utils/AppError.js";
import { deleteRoomImages } from "./roomController.js";

export const getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    let sort = {};

    // Special case: Rooms → only active for clients or unauthenticated users
    if (Model.modelName === "Room") {
      if (req.user) {
        if (req.user.role === "client") {
          filter.status = { $eq: "active" };
          sort = { availableFrom: -1 };
        }
        if (req.user.role === "landlord") {
          filter.landlordId = { $eq: req.user.id };
          sort = { updatedAt: -1 };
        }
        if (req.user.role === "admin") sort = { updatedAt: -1 };
      } else {
        filter.status = { $eq: "active" };
        sort = { availableFrom: -1 };
      }
    }

    // const features = new ApiFeatures(Model.find(filter), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    //Execute query
    // const doc = await features.query;

    const doc = await Model.find(filter).sort(sort);

    //Send response
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    if (req?.user?.role === "landlord" && Model.modelName === "User")
      query = query.populate({
        path: "totalListings",
      });
    const doc = await query;

    if (!doc) return next(new AppError("No document found with that ID", 404));

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    let doc;
    if (Model.modelName === "Room" && req.user.role === "landlord") {
      doc = await Model.findOneAndDelete({
        _id: req.params.id,
        landlordId: req.user._id,
      });
      await deleteRoomImages(doc, next);
    } else {
      doc = await Model.findByIdAndDelete(req.params.id);
    }

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
