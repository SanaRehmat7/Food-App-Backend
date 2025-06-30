import express, { RequestHandler } from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { fixHandler } from "../utils/fixHandler";
import { validateMyRestaurantRequest } from "../middleware/validation";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get(
  "/order",
  ...fixHandler(
    [jwtCheck, jwtParse],
    MyRestaurantController.getMyRestaurantOrders
  )
);

router.patch(
  "/order/:orderId/status",
  ...fixHandler(
    [jwtCheck, jwtParse],
    MyRestaurantController.updateOrderStatus
  )
);

router.get(
  "/",
  ...fixHandler(
    [jwtCheck, jwtParse],
    MyRestaurantController.getMyRestaurant
  )
);

router.post(
  "/",
  ...fixHandler(
    [
      upload.single("imageFile"),
      ...(validateMyRestaurantRequest as RequestHandler[]),
      jwtCheck,
      jwtParse,
    ],
    MyRestaurantController.createMyRestaurant
  )
);

router.put(
  "/",
  ...fixHandler(
    [
      upload.single("imageFile"),
      ...(validateMyRestaurantRequest as RequestHandler[]),
      jwtCheck,
      jwtParse,
    ],
    MyRestaurantController.updateMyRestaurant
  )
);


export default router;
