import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const category = await Category.create({
        name,
        description,
        created_by: req.user.id,
    });
    return res
        .status(201)
        .json(new ApiResponse(201, category, "Category created successfully"));
});

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.findAll();
    return res
        .status(200)
        .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export { createCategory, getCategories };
