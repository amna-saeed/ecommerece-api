import express from 'express';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import {testConnection} from './config/database.js';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})
app.use('/api/', limiter);

// body parser
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true, limit: '10mb'}))

// compression
app.use(compression());

// logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan())
}

// routes
app.use('/api', router)
// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res)=> {
    res.status(404).json({success:false, message: "Route not fount"})
})


// error handler
app.use(errorHandler);

// start server 
const startServer = async()=> {
    try{
        await testConnection();

        app.listen(PORT, ()=> {
            console.log(`Server is running on the PORT ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
        })
    }catch(error){
        console.log('Failed to start server', error);
        process.exit(1);
    }
};
startServer();


