import mongoose from "mongoose";
import slugify from "slugify";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A room must have a name"],
      unique: true,
      minLength: [10, "A room title must have more than 10 characters"],
      maxLength: [40, "A room title must have less than 40 characters"],
    },
    slug: String,
    location: {
      type: String,
      required: [true, "Location of the room is required!"],
    },
    area: {
      type: String,
      required: [true, "Area of the room is required!"],
    },
    price: {
      type: Number,
      required: [true, "A room must have a price"],
    },
    type: {
      type: String,
      required: [true, "A room must be of a type"],
      enum: {
        values: ["studio", "shared", "1bk", "2bk", "1bhk", "2bhk", "3bhk"],
        message:
          "Type is only of the following: studio, shared, 1bk, 2bk, 1bhk, 2bhk, 3bhk",
      },
    },
    availableFrom: Date,
    bookedFrom: Date,
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amenities: [String],
    thumbnail: {
      url: {
        type: String,
        required: [true, "A room must have a thumbnail URL"],
      },
      public_id: {
        type: String,
        required: [true, "A room must have a thumbnail public_id"],
      },
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image is required",
      },
    },
    views: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: [
          "active",
          "pending",
          "book-pending",
          "booked",
          "rejected",
          "inactive",
        ],
        message:
          "Room status can be either: pending, book-pending, active, rejected or booked",
      },
    },
    description: {
      type: String,
      required: [true, "A room must have a description"],
    },
    additionalInfo: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtuals
roomSchema.virtual("landlord", {
  ref: "User",
  localField: "landlordId",
  foreignField: "_id",
  justOne: true,
});

//Document middleware
roomSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Query middleware
// roomSchema.pre(/^find/, function (next) {
//   if (!req.user || req.user.role === "client")
//     filter = { status: { $eq: "active" } };
//   next();
// });

const Room = mongoose.model("Room", roomSchema);

export default Room;
