import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";
import { fixHandler } from "../utils/fixHandler"; 

const router = express.Router();

// GET current user
router.get(
  "/",
  ...fixHandler([jwtCheck, jwtParse], MyUserController.getCurrentUser)
);

// POST create user
router.post(
  "/",
  ...fixHandler([jwtCheck], MyUserController.createCurrentUser)
);

// PUT update user (with validation)
router.put(
  "/",
  ...fixHandler([jwtCheck, jwtParse, ...validateMyUserRequest], MyUserController.updateCurrentUser)
);

export default router;
