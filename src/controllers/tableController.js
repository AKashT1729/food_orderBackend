import ApiError from "../utils/ApiError.js";
import { Table } from "../models/table.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createTable = async (req, res, next) => {
  try {
    const { table_number, capacity = 4 } = req.body;

    if (!table_number) {
      return next(new ApiError(400, "Table number is required"));
    }

    // Generate QR code URL
    const qr_code = `table-${table_number}`;

    const table = await Table.create({
      table_number,
      qr_code,
      capacity,
    });

    return res.status(201).json(new ApiResponse(201, table));
  } catch (error) {
    return next(error);
  }
};

const getAllTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate('current_customer_id', 'name phone_number');
    return res.status(200).json(new ApiResponse(200, tables));
  } catch (error) {
    return next(error);
  }
};

const getTable = async (req, res, next) => {
  try {
    const tableId = req.params.table_id;
    const table = await Table.findById(tableId).populate('current_customer_id', 'name phone_number');

    if (!table) {
      return next(new ApiError(404, `Table ${tableId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, table));
  } catch (error) {
    return next(error);
  }
};

const getTableByQR = async (req, res, next) => {
  try {
    const { qr_code } = req.params;
    const table = await Table.findOne({ qr_code }).populate('current_customer_id', 'name phone_number');

    if (!table) {
      return next(new ApiError(404, `Table with QR code ${qr_code} not found`));
    }

    return res.status(200).json(new ApiResponse(200, table));
  } catch (error) {
    return next(error);
  }
};

const updateTableStatus = async (req, res, next) => {
  try {
    const tableId = req.params.table_id;
    const { status, current_customer_id } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (current_customer_id !== undefined) updateData.current_customer_id = current_customer_id;

    const table = await Table.findByIdAndUpdate(tableId, updateData, {
      new: true,
      runValidators: true,
    }).populate('current_customer_id', 'name phone_number');

    if (!table) {
      return next(new ApiError(404, `Table ${tableId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, table));
  } catch (error) {
    return next(error);
  }
};

const deleteTable = async (req, res, next) => {
  try {
    const tableId = req.params.table_id;
    const table = await Table.findByIdAndDelete(tableId);

    if (!table) {
      return next(new ApiError(404, `Table ${tableId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, { message: "Table deleted successfully" }));
  } catch (error) {
    return next(error);
  }
};

export { createTable, getAllTables, getTable, getTableByQR, updateTableStatus, deleteTable };