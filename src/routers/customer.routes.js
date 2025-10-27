import { Router } from "express";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.route("/").post(asyncHandler(createCustomer));
router.route("/:customer_id").get(asyncHandler(getCustomer));
router.route("/:customer_id").patch(asyncHandler(updateCustomer));

export default router;