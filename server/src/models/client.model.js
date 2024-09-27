import { sequelize } from "../db/index.js";
import { DataTypes } from "sequelize";

const Client = sequelize.define(
    "Client",
    {
        business_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        representative_position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        representative_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            },
        },
        phone_number: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                len: [10],
            },
        },
        card_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sort_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "clients",
        timestamps: true,
    }
);

export default Client;
