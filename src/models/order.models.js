import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    customer_id: {
      type: String,
      required: true,
      ref: "Customer",
    },
    total_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Dine-in", "To-go"],
      default: "Dine-in",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
