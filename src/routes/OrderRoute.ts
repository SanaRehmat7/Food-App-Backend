import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";
import { fixHandler } from "../utils/fixHandler";

const router = express.Router();

//get my order
router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);

router.post(
  "/checkout/create-checkout-session",
  ...fixHandler(
    [jwtCheck, jwtParse],
    OrderController.createCheckoutSession
  )
);

router.post(
  "/checkout/webhook",
  ...fixHandler([], OrderController.stripeWebhookHandler)
);

export default router;