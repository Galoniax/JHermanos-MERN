import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    finalPrice: { type: Number, index: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    metrics: {
      type: Map,
      of: String,
    },
    especifications: {
      type: Map,
      of: String,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    image_url: [
      {
        type: String,
        required: true,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Se ejecuta antes de actualizar el documento
ProductSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.price !== undefined || update.discount !== undefined) {
    const docToUpdate = await this.model.findOne(this.getQuery());

    const calcPrice =
      update.price !== undefined ? update.price : docToUpdate.price;
    const calcDiscount =
      update.discount !== undefined ? update.discount : docToUpdate.discount;

    update.finalPrice =
      calcDiscount > 0
        ? calcPrice - calcPrice * (calcDiscount / 100)
        : calcPrice;
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
