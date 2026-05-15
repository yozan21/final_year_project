import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import User from "../models/UserModel.js";
import AppError from "../utils/AppError.js";
import AuthError from "../utils/AuthError.js";

const signAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

const signRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

const createSendToken = (user, code, req, res) => {
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  user.password = undefined;

  return res
    .status(code)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:
        Number.parseInt(process.env.JWT_ACCESS_COOKIE_EXPIRES_IN) * 60 * 1000, // 7 days
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:
        Number.parseInt(process.env.JWT_REFRESH_COOKIE_EXPIRES_IN) *
        24 *
        60 *
        60 *
        1000, // 7 days
    })
    .json({
      status: "success",
      data: { user },
    });
};

export const signup = asyncHandler(async (req, res, next) => {
  if (req.body.role === "admin")
    return next(new AppError("You are not authorized!", 403));

  const newUser = await User.create({ ...req.body });

  createSendToken(newUser, 201, req, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //1. Check If email and password exists
  if (!email || !password) {
    return next(new AppError("Email and password is required!", 400));
  }

  //2.Check if user exits and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password)))
    return next(new AppError("Email or Password is invalid!", 401));

  //3. If everything is correct then send the token to the client
  createSendToken(user, 200, req, res);
});

export const refresh = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) return next(new AuthError("No refresh token", 403)); // 403 not 401

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return next(new AuthError("User no longer exists!", 403));

    const accessToken = signAccessToken(user.id);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge:
          Number.parseInt(process.env.JWT_ACCESS_COOKIE_EXPIRES_IN) * 60 * 1000, // 15 mins
      })
      .json({ message: "Token Refreshed" });
  } catch (err) {
    return next(new AuthError("Invalid or expired refresh token", 403));
  }
});

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.accessToken;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  // console.log(req.cookies);

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User no longer exists!", 401));
  }

  //Check if user changed the password after the token was issued
  if (currentUser.hasChangedPassword(decoded.iat))
    return next(
      new AppError(
        "User recently changed the password. Please login again!",
        401,
      ),
    );

  //Grant access to the protected route
  req.user = currentUser; // attach user to request
  next();
});

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You don't have permission to perform this action!", 403),
      );

    next();
  };

export const logout = (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ status: "success" });
};
