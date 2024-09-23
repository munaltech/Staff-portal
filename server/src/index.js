import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import User from "./models/user.model.js";


dotenv.config({
    path: './env'
});





connectDB()
.then(()=>{
    User.sequelize.sync({ alter: true });
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT || 8000}`);
    })
})


.catch(err => {
    console.log("Database Connection Error: ", err);
});