import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import AppError from "./utils/AppError.js";
import globalErrorHandler from "./controllers/errorController.js";

import roomRouter from "./routes/roomRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

//CORS issues
app.use(cors());

//REQUEST LOGGER
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Limit req from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
// app.use("/api", limiter);

//Body parser, reading from body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/bookings", bookingRouter);

//Get req to root of this app
app.use("/", (req, res, next) => {
  res.status("200").send("Backend is running");
});

//Unknown Api Endpoints Error handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global error handling middleware
app.use(globalErrorHandler);

export default app;
