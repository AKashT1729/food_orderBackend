import { Router } from "express";
import {
  createTable,
  getAllTables,
  getTable,
  getTableByQR,
  updateTableStatus,
  deleteTable,
} from "../controllers/tableController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.route("/").get(asyncHandler(getAllTables));
router.route("/").post(asyncHandler(createTable));
router.route("/:table_id").get(asyncHandler(getTable));
router.route("/:table_id").patch(asyncHandler(updateTableStatus));
router.route("/:table_id").delete(asyncHandler(deleteTable));
router.route("/qr/:qr_code").get(asyncHandler(getTableByQR));

export default router;