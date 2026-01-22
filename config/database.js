import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "site_auth",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "root",
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: false
        }
    }
);

const testConnection = async()=> {
    try{
        await sequelize.authenticate();
        console.log('Database connected successfully');
    }catch(error){
        console.log('Unable to connect to the database:', error);
    }
}

export {sequelize,testConnection};