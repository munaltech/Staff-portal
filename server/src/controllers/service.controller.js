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
        .json(
            new ApiResponse(201, createdService, "Service created successfully")
        );
});

const updateService = asyncHandler(async (req, res) => {
    const { id } = req.params;
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
    const service = await Service.findByPk(id);
    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    service.name = name;
    service.description = description;
    service.price = price;
    service.duration = duration;
    service.category_id = category_id;
    service.status = status;
    service.tags = tags;
    service.additional_notes = additional_notes;
    await service.save();
    return res
        .status(200)
        .json(new ApiResponse(200, service, "Service updated successfully"));
});

const getServices = asyncHandler(async (req, res) => {
    const services = await Service.findAll();
    return res
        .status(200)
        .json(new ApiResponse(200, services, "Services fetched successfully"));
});

const getService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    if (!service) {
        throw new ApiError(404, "Service not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, service, "Service fetched successfully"));
});

export { addService, getServices, getService, updateService };
