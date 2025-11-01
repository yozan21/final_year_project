import { Router } from "express";
import * as bookingController from "../controllers/bookingController.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.use(authController.protect);

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(
    authController.restrictTo("client", "admin"),
    bookingController.uploadBookingScreenshot,
    bookingController.uploadToCloudinary,
    bookingController.createBooking
  );

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(authController.restrictTo("admin"), bookingController.updateBooking)
  .delete(authController.restrictTo("admin"), bookingController.deleteBooking);

export default router;
