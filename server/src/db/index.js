import mysql from "mysql2";


const pool =  mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const connectDB = async () => {

    // connect to database
    try {
        await pool.getConnection();
        console.log("Database Connected");
        
    } catch (error) {
        console.log("Database Connection Error: ", error);
        process.exit(1);
    }
}

export { pool, connectDB };