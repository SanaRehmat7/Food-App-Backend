import express from "express";
import { fixHandler } from "../utils/fixHandler";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  ...fixHandler([], RestaurantController.getRestaurant)
);

// /api/restaurant/search/london
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City paramenter must be a valid string"),
  ...fixHandler([], RestaurantController.searchRestaurant)
);

export default router;