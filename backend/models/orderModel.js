import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    placedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalPrice: {
      type: Number,
    },
    payment: {},
    status: {
      type: String,
      enum: ["delivered", "processing", "cancelled", "placed"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
