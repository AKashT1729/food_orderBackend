import ApiError from "../utils/ApiError.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return next(new ApiError(400, "Name, price, and category are required"));
    }

    const product = await Product.create({
      name,
      price,
      category,
    });

    return res.status(201).json(new ApiResponse(201, product));
  } catch (error) {
    return next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    return res.status(200).json(new ApiResponse(200, products));
  } catch (error) {
    return next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ApiError(404, `Product ${productId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, product));
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new ApiError(404, `Product ${productId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, product));
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ApiError(404, `Product ${productId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, { message: "Product deleted successfully" }));
  } catch (error) {
    return next(error);
  }
};

export { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct };