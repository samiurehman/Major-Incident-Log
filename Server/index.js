// Import required modules
import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import mysql from "mysql"; // Import MySQL module

// Create an Express app
const app = express();

// Configure CORS
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Define MySQL connection pool configuration
const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "", 
    database: "DurhamPolice",
});

// Middleware to add MySQL pool to request object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Define routes
app.use('/auth', adminRouter);

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
