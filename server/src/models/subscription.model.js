import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import Client from "./client.model.js";
import User from "./user.model.js";

const Subscription = sequelize.define(
    "Subscription",
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "id",
            },
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ended_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "subscriptions",
        timestamps: true,
    }
);

export default Subscription;
