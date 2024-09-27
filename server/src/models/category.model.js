import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Category = sequelize.define(
    "Category",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
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
        tableName: "categories",
        timestamps: true,
    }
);

export default Category;
