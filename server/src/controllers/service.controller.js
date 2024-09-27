import Service from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addService = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        duration,
        category_id,
        status,
        tags,
        additional_notes,
    } = req.body;

    

    const service = await Service.create({
        name,
        description,
        price,
        duration,
        category_id,
        status,
        tags,
        additional_notes,
        created_by: req.user.id,
    });

    const createdService = await Service.findByPk(service.id);

    if (!createdService) {
        throw new ApiError(400, "Error Creating Service");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdService, "Service created successfully"));

});

const getServices = asyncHandler(async (req, res) => {
    const services = await Service.findAll();
    return res
        .status(200)
        .json(new ApiResponse(200, services, "Services fetched successfully"));
});

export { addService, getServices };
