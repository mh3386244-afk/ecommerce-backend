// src/DB/Models/Category.model.js
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      unique: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const CategoryModel = mongoose.model("category", categorySchema);