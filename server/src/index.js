import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import { sequelize } from "./db/index.js";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(async () => {
        try {
            await sequelize.sync();
            app.listen(process.env.PORT || 8000, () => {
                console.log(
                    `Server running on port ${process.env.PORT || 8000}`
                );
            });
        } catch (syncError) {
            console.log("Sequelize Sync Error: ", syncError);
        }
    })
    .catch((err) => {
        console.log("Database Connection Error: ", err);
    });
