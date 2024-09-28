import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Client from "./client.model.js";

const Comment = sequelize.define(
    "Comment",
    {
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: "id",
            },
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "comments",
        timestamps: true,
    }
);

export default Comment;
