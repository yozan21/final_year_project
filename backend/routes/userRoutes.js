import { Router } from "express";

import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";

const router = Router();

router.post("/login", authController.login);

router.post("/signup", authController.signup);

router.post("/logout", authController.logout);

router.use(authController.protect);
router.route("/me").get(userController.getMe, userController.getUser);
router
  .route("/landlordStats")
  .get(
    authController.restrictTo("landlord", "admin"),
    userController.getLandlordStats
  );
router
  .route("/adminStats")
  .get(authController.restrictTo("admin"), userController.getAdminStats);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUser);

export default router;
