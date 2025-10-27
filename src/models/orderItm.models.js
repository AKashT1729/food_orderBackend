import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order_item_id: {
      type: String,
      required: true,
      unique: true,
    },
    order_id: {
      type: String,
      required: true,
      ref: "Order",
    },
    product_id: {
      type: String,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
