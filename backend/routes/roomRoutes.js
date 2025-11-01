import { Router } from "express";
import * as roomController from "../controllers/roomController.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.route("/featured").get(roomController.getFeatured);

router.use(authController.protect);

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(
    authController.restrictTo("landlord"),
    roomController.uploadRoomImages,
    roomController.resizeUploadedRoomImages,
    roomController.getLandlordId,
    roomController.createRoom
  );

router
  .route("/:id")
  .get(roomController.getRoomDetails)
  .patch(
    authController.restrictTo("landlord", "admin"),
    roomController.uploadRoomImages,
    roomController.updateRoomImages,
    roomController.updateRoom
  )
  .delete(
    authController.restrictTo("landlord", "admin"),
    roomController.deleteRoom
  );

router.patch(
  "/:id/updateRoomStatus",
  authController.restrictTo("landlord", "admin"),
  roomController.updateRoomStatus
);

export default router;
