// src/Modules/Subcategory/subcategory.controller.js
import { subcategoryModel } from "../../DB/Models/subcategory.model.js";
import { CategoryModel } from "../../DB/Models/Category.model.js";
import slugify from "slugify";

const getAll = async (req, res, next) => {
    try {
        const subcategories = await subcategoryModel.find().populate("category_id", "name -_id");
        return res.status(200).json({ message: "subcategories fetched successfully", subcategories });
    } catch (error) {
        return next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const subcategory = await subcategoryModel.findById(_id).populate("category_id", "name -_id");
        if (!subcategory) return res.status(404).json({ message: "subcategory not found" });
        return res.status(200).json({ message: "subcategory fetched successfully", subcategory });
    } catch (error) {
        return next(error);
    }
};

const add = async (req, res, next) => {
    try {
        const { name, category_id } = req.body;

        const category = await CategoryModel.findById(category_id);
        if (!category) return res.status(404).json({ message: "category not found" });

        const subcategory = await subcategoryModel.create({
            name,
            slug: slugify(name),
            category_id,
        });
        return res.status(201).json({ message: "subcategory created successfully", subcategory });
    } catch (error) {
        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { name, category_id } = req.body;
        const updateData = {};

        if (name) {
            updateData.name = name;
            updateData.slug = slugify(name);
        }
        if (category_id) {
            const category = await CategoryModel.findById(category_id);
            if (!category) return res.status(404).json({ message: "category not found" });
            updateData.category_id = category_id;
        }

        const subcategory = await subcategoryModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
        if (!subcategory) return res.status(404).json({ message: "subcategory not found" });
        return res.status(200).json({ message: "subcategory updated successfully", subcategory });
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const subcategory = await subcategoryModel.findByIdAndDelete(_id);
        if (!subcategory) return res.status(404).json({ message: "subcategory not found" });
        return res.status(200).json({ message: "subcategory deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

export { getAll, get, add, update, remove };