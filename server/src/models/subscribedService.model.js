import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import Subscription from "./subscription.model.js";
import Service from "./service.model.js";

const SubscribedService = sequelize.define(
    "SubscribedService",
    {
        subscription_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Subscription,
                key: "id",
            },
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: "id",
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: "subscribed_services",
        timestamps: true,
    }
);

export default SubscribedService;
