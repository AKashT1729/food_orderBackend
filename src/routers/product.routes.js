import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.route("/").get(asyncHandler(getAllProducts));
router.route("/").post(asyncHandler(createProduct));
router.route("/:product_id").get(asyncHandler(getProduct));
router.route("/:product_id").patch(asyncHandler(updateProduct));
router.route("/:product_id").delete(asyncHandler(deleteProduct));

export default router;