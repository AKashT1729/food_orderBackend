import ApiError from "../utils/ApiError.js";
import { Customer } from "../models/customer.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createCustomer = async (req, res, next) => {
  try {
    const { name, phone_number, email, address } = req.body;

    if (!name || !phone_number) {
      return next(new ApiError(400, "Name and phone number are required"));
    }

    const existingCustomer = await Customer.findOne({ phone_number });
    if (existingCustomer) {
      return res.status(200).json(new ApiResponse(200, existingCustomer));
    }

    const customer = await Customer.create({
      name,
      phone_number,
      email,
      address,
    });

    return res.status(201).json(new ApiResponse(201, customer));
  } catch (error) {
    return next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customer_id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return next(new ApiError(404, `Customer ${customerId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, customer));
  } catch (error) {
    return next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customer_id;
    const updates = req.body;

    const customer = await Customer.findByIdAndUpdate(customerId, updates, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return next(new ApiError(404, `Customer ${customerId} not found`));
    }

    return res.status(200).json(new ApiResponse(200, customer));
  } catch (error) {
    return next(error);
  }
};

export { createCustomer, getCustomer, updateCustomer };