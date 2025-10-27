import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    table_number: {
      type: Number,
      required: true,
      unique: true,
      min: [1, "Table number must be at least 1"],
    },
    qr_code: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },
    capacity: {
      type: Number,
      default: 4,
      min: [1, "Capacity must be at least 1"],
    },
    current_customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  }
);

export const Table = mongoose.model("Table", tableSchema);