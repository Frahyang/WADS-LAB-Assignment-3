import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";

import swaggerSpec from './utils/swagger.js';

import todoRoute from "./routes/todoRoute.js";
import usersRoute from "./routes/usersRoute.js";

const app = express();
dotenv.config();

app.use(express.json()); // Built-in body-parser for parsing JSON

const corsOptions = {
    origin: "*",
    credentials: false,
};

app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(cookieParser()); // Enable cookie parsing

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT

// Ensure trust for reverse proxies (e.g., Nginx or cloud hosting)
app.set('trust proxy', true);

app.use("/todo", todoRoute);
app.use("/user", usersRoute);

// api documentation endpoint
app.use("/todolist/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Todo List Management API",
}))

mongoose.set("strictQuery", true)

// Start the server
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));