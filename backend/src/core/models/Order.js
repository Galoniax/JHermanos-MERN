import mongoose from 'mongoose';

const { Schema } = mongoose;

const decimalToNumber = (v) => (v == null ? v : parseFloat(v.toString()));

const positive = {
  validator: (v) => v == null || parseFloat(v.toString()) >= 0,
  message: 'El monto no puede ser negativo.',
};

const OrderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unit_price: {
      type: Schema.Types.Decimal128,
      required: true,
      validate: positive,
      get: decimalToNumber,
    },
  },
  { _id: false } // Evita generar un _id innecesario para cada item individual
);

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: {
      type: [OrderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'Una orden debe contener al menos un producto.',
      },
    },
    total_amount: {
      type: Schema.Types.Decimal128,
      required: true,
      validate: positive,
      get: decimalToNumber,
    },
    status: {
      type: String,
      enum: ['PENDIENTE', 'PAGADO', 'ENTREGADO', 'CANCELADO'],
      default: 'PENDIENTE',
      index: true,
    },
    shipping_address: {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      street_name: { type: String, required: true },
      street_number: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    checkout_reference: { type: String, required: true, unique: true },
    idempotency_key: { type: String, required: true, unique: true },
    mp_order_id: { type: String, index: true },
    mp_status: { type: String },
    mp_status_detail: { type: String },
    paid_at: { type: Date },

    payment_id: String,
  },

  { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } }
);

OrderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
