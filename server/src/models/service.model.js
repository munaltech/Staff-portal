import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Category from "./category.model.js";

const Service = sequelize.define(
    "Service",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: "id",
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "active",
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        additional_notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "services",
        timestamps: true,
    }
);

export default Service;