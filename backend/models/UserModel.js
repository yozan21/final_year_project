import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    address: {
      type: String,
      required: [true, "Please provide your address!"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: 10,
    },
    phoneSecond: String,
    role: {
      type: String,
      required: [true, "User must have a role"],
      default: "client",
      enum: ["client", "landlord", "admin"],
    },
    avatar: {
      type: String,
      default: "default-avatar.jpg",
    },
    bio: String,
    verified: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        // This only works on CREATE and SAVE
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    changedPasswordAt: Date,
    passwordResetOTP: Number,
    passworResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Virtuals
userSchema.virtual("notifications", {
  ref: "Notification",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

userSchema.virtual("totalListings", {
  ref: "Room", // the model to reference
  localField: "_id", // User _id
  foreignField: "landlordId", // Room field pointing to landlord
  count: true, // return number of matching rooms instead of full array
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.changedPasswordAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.hasChangedPassword = function (JWTTimestamp) {
  if (this.changedPasswordAt) {
    const changedTimestamp = this.changedPasswordAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }
  //Default to false i.e. user hasn't changed the password after signup
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
