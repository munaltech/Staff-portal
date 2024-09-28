import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Subscription from "../models/subscription.model.js";
import Client from "../models/client.model.js";
import Service from "../models/service.model.js";
import SubscribedService from "../models/subscribedService.model.js";
import { Op } from "sequelize";

const addSubscription = asyncHandler(async (req, res) => {
    const { client, date, description, discount, total, services } = req.body;

    if (!client || !date || !services || !total) {
        throw new ApiError(400, "Missing required fields");
    }

    const existingClient = Client.findOne({ where: { id: client } });

    if (!existingClient) {
        throw new ApiError(401, "Client does not exist");
    }

    services.map(async (service) => {
        const existingService = await Service.findOne({
            where: { id: service.id },
        });
        if (!existingService) {
            throw new ApiError(402, "Service does not exist");
        }
    });

    const subscription = await Subscription.create({
        client_id: client,
        started_at: date,
        description,
        discount,
        total,
        created_by: req.user.id,
    });

    const createdSubscription = await Subscription.findOne({
        where: { id: subscription.id },
    });

    if (!createdSubscription) {
        throw new ApiError(500, "Failed to create subscription");
    }

    const subscribedServices = await services.map(async (service) => {
        const subscribedService = await SubscribedService.create({
            subscription_id: subscription.id,
            service_id: service.id,
            price: service.price,
        });

        if (!subscribedService) {
            throw new ApiError(500, "Failed to create subscribed service");
        }
    });

    const data = {
        createdSubscription,
        subscribedServices,
    };

    return res
        .status(201)
        .json(new ApiResponse(201, data, "Subscription created successfully"));
});

const updateSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { client, date, description, discount, total, services } = req.body;

    if (!client || !date || !services || !total) {
        throw new ApiError(400, "Missing required fields");
    }

    // Find the subscription
    const subscription = await Subscription.findOne({ where: { id } });
    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    // Update subscription fields
    subscription.client_id = client;
    subscription.started_at = date;
    subscription.description = description;
    subscription.discount = discount;
    subscription.total = total;
    await subscription.save();

    // Fetch all currently subscribed services for the subscription
    const allSubscribedServices = await SubscribedService.findAll({
        where: { subscription_id: subscription.id },
    });

    // Extract service IDs from the frontend-provided services
    const servicesIdFromFrontend = services.map(service => service.id);

    // Remove services that are in `SubscribedService` but not in frontend services
    await Promise.all(
        allSubscribedServices.map(async (subscribedService) => {
            if (!servicesIdFromFrontend.includes(subscribedService.service_id)) {
                await subscribedService.destroy();
            }
        })
    );

    // Loop through each service from frontend
    const subscribedServices = await Promise.all(
        services.map(async (service) => {
            // Check if the service exists in SubscribedServices for this subscription
            let subscribedService = await SubscribedService.findOne({
                where: {
                    subscription_id: subscription.id,
                    service_id: service.id,
                },
            });

            if (subscribedService) {
                // Service exists, update the price
                subscribedService.price = service.price;
                await subscribedService.save();
            } else {
                // Service doesn't exist, create a new SubscribedService
                subscribedService = await SubscribedService.create({
                    subscription_id: subscription.id,
                    service_id: service.id,
                    price: service.price,
                });
            }

            return subscribedService;
        })
    );

    // Respond with updated subscription and subscribed services
    const data = {
        subscription,
        subscribedServices,
    };

    return res.status(200).json(new ApiResponse(200, data, "Subscription updated successfully"));
});


const getSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Subscription.findAll();

    const updatedSubscriptions = await Promise.all(
        subscriptions.map(async (subscription) => {
            // Convert the subscription instance to a plain object
            const subscriptionData = subscription.toJSON();

            // Fetch the client data
            const client = await Client.findOne({
                where: { id: subscription.client_id },
            });

            // Fetch subscribed services
            const subscribedServices = await SubscribedService.findAll({
                where: { subscription_id: subscription.id },
            });

            // Fetch each service associated with subscribed services
            const services = await Promise.all(
                subscribedServices.map(async (subscribedService) => {
                    let service = await Service.findOne({
                        where: { id: subscribedService.service_id },
                    });
                    service.price = subscribedService.price;
                    return service;
                })
            );

            // Add client and services to the plain subscription object
            subscriptionData.client = client;
            subscriptionData.services = services;

            return subscriptionData;
        })
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedSubscriptions,
                "Subscriptions fetched successfully"
            )
        );
});

const getSubscription = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the subscription by ID
    const subscription = await Subscription.findOne({
        where: { id },
    });

    // If subscription is not found, throw an error
    if (!subscription) {
        throw new ApiError(404, "Subscription not found");
    }

    // Fetch the subscribed services
    const subscribedServices = await SubscribedService.findAll({
        where: { subscription_id: subscription.id },
    });

    const services = await Promise.all(
        subscribedServices.map(async (subscribedService) => {
            let service = await Service.findOne({
                where: { id: subscribedService.service_id },
            });
            service.price = subscribedService.price; // Assuming `price` can be set directly

            return service;
        })
    );

    console.log(services);

    // Format the data to match the output structure you want
    const formattedSubscription = {
        client: subscription.client_id, // Client ID
        date: subscription.started_at, // The subscription start date
        description: subscription.description,
        services: services,
        total: subscription.total,
        discount: subscription.discount,
    };

    // Return the formatted subscription data
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                formattedSubscription,
                "Subscription fetched successfully"
            )
        );
});

export {
    addSubscription,
    getSubscriptions,
    getSubscription,
    updateSubscription,
};
