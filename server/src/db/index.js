import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, 
    process.env.MYSQL_USER,     
    process.env.MYSQL_PASSWORD, 
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false, 
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected');
    } catch (error) {
        console.error('Database Connection Error: ', error);
        process.exit(1);
    }
}

export { sequelize, connectDB };
