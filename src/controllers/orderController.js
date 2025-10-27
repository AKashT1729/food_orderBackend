import ApiError from "../utils/ApiError.js";
import { OrderItem } from "../models/orderItm.models.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";

const createOrder = async (req, res, next) => {
  try {
    const { customer_id, items } = req.body;
    if (!customer_id || !items || !Array.isArray(items) || items.length === 0) {
      return next(new ApiError(400, "Missing required fields"));
    }

    const order = await Order.create({ customer_id });

    // create order items in parallel and compute subtotal for each
    const subtotals = await Promise.all(
      items.map(async ({ product_id, quantity }) => {
        const product = await Product.findById(product_id);
        if (!product) {
          throw new ApiError(404, `Product ${product_id} not found`);
        }

        await OrderItem.create({
          order_id: order._id,
          product_id,
          quantity,
        });

        return product.price * quantity;
      })
    );

    const totalAmount = subtotals.reduce((acc, cur) => acc + cur, 0);

    order.total_amount = totalAmount;
    await order.save();

    return res.status(201).json({
      success: true,
      data: order._id,
    });
  } catch (error) {
    return next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.order_id;
    const order = await Order.findById(orderId).populate({
      path: "order_items",
      populate: {
        path: "product_id",
        model: "Product",
      },
    });

    if (!order) {
      return next(new ApiError(404, `Order ${orderId} not found`));
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.order_id;
    const { status } = req.body;

    if (!status) {
      return next(new ApiError(400, "Missing required fields"));
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new ApiError(404, `Order ${orderId} not found`));
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};
export { createOrder, getOrder, updateOrderStatus };
