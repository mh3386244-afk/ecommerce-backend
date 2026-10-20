// src/Modules/Category/category.controller.js
import { CategoryModel } from "../../DB/Models/Category.model.js";
import { subcategoryModel } from "../../DB/Models/subcategory.model.js";
import cloudinary from "../../Servies/Ccloud.config.js";
import slugify from "slugify";

const getAll = async (req, res, next) => {
    try {
        const categories = await CategoryModel.find();
        return res.status(200).json({ message: "categories fetched successfully", categories });
    } catch (error) {
        return next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const category = await CategoryModel.findById(_id);
        if (!category) return res.status(404).json({ message: "category not found" });
        return res.status(200).json({ message: "category fetched successfully", category });
    } catch (error) {
        return next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!req.file) return res.status(400).json({ message: "image is required" });

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: "e-comm/category",
        });

        const category = await CategoryModel.create({
            name,
            slug: slugify(name),
            image: { secure_url, public_id },
        });
        return res.status(201).json({ message: "category created successfully", category });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { name } = req.body;

        const category = await CategoryModel.findById(_id);
        if (!category) return res.status(404).json({ message: "category not found" });

        if (name) {
            category.name = name;
            category.slug = slugify(name);
        }

        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                folder: "e-comm/category",
            });
            await cloudinary.uploader.destroy(category.image.public_id); // امسح القديمة
            category.image = { secure_url, public_id };
        }

        await category.save();
        return res.status(200).json({ message: "category updated successfully", category });
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const category = await CategoryModel.findByIdAndDelete(_id);
        if (!category) return res.status(404).json({ message: "category not found" });

        await cloudinary.uploader.destroy(category.image.public_id);
        await subcategoryModel.deleteMany({ category_id: _id }); // امسح الـ subcategories التابعة ليها
        return res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

export { getAll, get, add, update, remove };