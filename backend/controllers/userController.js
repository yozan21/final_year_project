import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import * as handlerFactory from "./handlerFactory.js";
import Room from "../models/RoomModel.js";
import mongoose from "mongoose";

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

export const getLandlordStats = asyncHandler(async (req, res) => {
  const landlordId = req.user.id; // assuming JWT middleware attaches user

  const result = await Room.aggregate([
    {
      $match: { landlordId: new mongoose.Types.ObjectId(landlordId) }, // only landlord's rooms
    },
    {
      $group: {
        totalListings: { $sum: 1 }, // count total rooms
        totalViews: { $sum: "$views" }, // sum of all views
        bookedRooms: {
          // count rooms where booked = true
          $sum: {
            $cond: [{ $eq: ["$status", "booked"] }, 1, 0],
          },
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      data: result[0] || { totalListings: 0, totalViews: 0, bookedRooms: 0 },
    },
  });
});

export const getAdminStats = asyncHandler(async (req, res) => {
  const [
    totalRooms,
    activeRooms,
    pendingRooms,
    bookedRooms,
    totalUsers,
    totalClient,
    totalLandlord,
    totalAdmin,
    verifiedUsers,
  ] = await Promise.all([
    Room.countDocuments(),
    Room.countDocuments({ status: "active" }),
    Room.countDocuments({ status: "pending" }),
    Room.countDocuments({ status: "booked" }),
    User.countDocuments(),
    User.countDocuments({ role: "client" }),
    User.countDocuments({ role: "landlord" }),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ verified: true }),
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: {
        totalRooms,
        activeRooms,
        pendingRooms,
        bookedRooms,
        totalUsers,
        totalClient,
        totalLandlord,
        totalAdmin,
        verifiedUsers,
      },
    },
  });
});

export const getAllUser = handlerFactory.getAll(User);
export const getUser = handlerFactory.getOne(User);
