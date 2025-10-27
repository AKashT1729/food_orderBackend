import { Router } from "express";
import {
  createOrder,
  getOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.route("/").post(asyncHandler(createOrder));
router.route("/:order_id").get(asyncHandler(getOrder));
router.route("/:order_id/status").patch(asyncHandler(updateOrderStatus));

export default router;