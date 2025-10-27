import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import orderRouter from './src/routers/order.routes.js';
import customerRouter from './src/routers/customer.routes.js';
import productRouter from './src/routers/product.routes.js';
import tableRouter from './src/routers/table.routes.js';
import { errorHandler } from './src/middlewares/error.middleware.js';

const app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Allow localhost on any port for development
            if (origin.match(/^http:\/\/localhost:\d+$/)) {
                return callback(null, true);
            }

            // Allow the specific origin from env or default
            const allowedOrigins = [
                process.env.CORS_ORIGIN || 'http://localhost:5173',
                'http://localhost:5174' // Additional common Vite port
            ];

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }
    )
)

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/tables', tableRouter);

// Error handling middleware
app.use(errorHandler);

export {app}