import Client from "../models/client.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Subscription from "../models/subscription.model.js";

const createClient = asyncHandler(async (req, res) => {
    const {
        business_name,
        address,
        representative_position,
        representative_name,
        email,
        phone_number,
        card_name,
        sort_code,
        account_number,
        bank_name,
    } = req.body;

    if (
        [
            business_name,
            address,
            representative_position,
            representative_name,
            email,
            card_name,
            sort_code,
            account_number,
            bank_name,
        ].includes(undefined)
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingClient = await Client.findOne({
        where: { phone_number, email, business_name },
    });

    if (existingClient) {
        throw new ApiError(409, "Client already exists");
    }

    const client = await Client.create({
        business_name,
        address,
        representative_position,
        representative_name,
        email,
        phone_number,
        card_name,
        sort_code,
        account_number,
        bank_name,
    });

    const createdClient = await Client.findByPk(client.id);

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdClient, "Client created successfully")
        );
});

const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.findAll();
    return res
        .status(200)
        .json(new ApiResponse(200, clients, "Clients fetched successfully"));
});

const getActiveClients = asyncHandler(async (req, res) => {
    // Fetch active subscriptions (those where ended_at is null)
    const activeSubscriptions = await Subscription.findAll({
        where: {
            ended_at: null,
        },
    });

    // Get unique client IDs from the active subscriptions
    const activeClientIds = [
        ...new Set(activeSubscriptions.map(subscription => subscription.client_id))
    ];

    // Fetch clients based on the unique client IDs
    const clients = await Client.findAll({
        where: {
            id: activeClientIds,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, clients, "Clients fetched successfully"));
});


const getClientDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
        throw new ApiError(404, "Client not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, client, "Client fetched successfully"));
});

const updateClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        business_name,
        address,
        representative_position,
        representative_name,
        email,
        phone_number,
        card_name,
        sort_code,
        account_number,
        bank_name,
    } = req.body;
    
    const client = await Client.findByPk(id);
    if (!client) {
        throw new ApiError(404, "Client not found");
    }

    

    client.business_name = business_name;
    client.address = address;
    client.representative_position = representative_position;
    client.representative_name = representative_name;
    client.email = email;
    client.phone_number = phone_number;
    client.card_name = card_name;
    client.sort_code = sort_code;
    client.account_number = account_number;
    client.bank_name = bank_name;
    await client.save();

    const updatedClient = await Client.findByPk(id);
    console.log(updatedClient);
    
    return res
        .status(200)
        .json(new ApiResponse(200, client, "Client updated successfully"));
});

export { createClient, getClients, getClientDetails, updateClient, getActiveClients };
