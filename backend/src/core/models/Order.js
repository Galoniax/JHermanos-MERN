import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.Mixed,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit_price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
  },
  { _id: false }, // Evita generar un _id innecesario para cada item individual
);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
    },
    items: {
      type: [OrderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "Una orden debe contener al menos un producto.",
      },
    },
    total_amount: {
      type: Schema.Types.Decimal128,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDIENTE", "PAGADO", "ENTREGADO", "CANCELADO"],
      default: "PENDIENTE",
    },
    shipping_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment_id: String,
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
