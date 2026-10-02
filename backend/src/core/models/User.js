import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{7,8}$/, "El DNI debe tener 7 u 8 dígitos numéricos"],
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    avatar_url: {
      type: String,
    },
    provider: {
      type: String,
      default: "LOCAL",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    active: {
      type: Boolean,
      default: true,
    },
    reset_code: {
      type: String,
    },
    reset_code_expires: {
      type: Date,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

export default User;
