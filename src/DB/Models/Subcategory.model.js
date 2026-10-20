// DB/Models/subcategory.model.js
import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema(
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
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "category", // لازم يطابق الاسم اللي سجلته في mongoose.model بتاع الـ category
      required: [true, "category_id is required"],
    },
  },
  { timestamps: true }
);

export const subcategoryModel = mongoose.model("subcategory", subcategorySchema);