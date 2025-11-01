import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "A booking must have a room"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A booking must have a user"],
    },
    transactionScreenshot: {
      type: String,
      required: [true, "Transaction screenshot is required"],
    },
    transactionCode: {
      type: String,
      required: [true, "Transaction code is required"],
    },
    paidAmount: {
      type: Number,
      required: [true, "Paid amount is required"],
      min: [0, "Paid amount cannot be negative"],
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "confirmed", "cancelled", "rejected"],
        message:
          "Booking status can be either: pending, confirmed, cancelled, or rejected",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
bookingSchema.virtual("room", {
  ref: "Room",
  localField: "roomId",
  foreignField: "_id",
  justOne: true,
});

bookingSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
