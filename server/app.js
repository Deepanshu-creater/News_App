const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Dotenv
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;

// Mongoose
require('./db/connect');
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for both local and deployed frontend (FIXED)
app.use(cors({
    origin: [
        'http://localhost:3000',                
        'https://news-app-eta-six-52.vercel.app' 
    ],
    credentials: true, // allows cookies / tokens to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Handle preflight requests explicitly
app.options('*', cors()); // This handles OPTIONS preflight requests

// Express Router
app.use(require('./routes/auth'));
app.use("/api/news", require("./routes/news"));

// Start server
app.listen(port, () => {
    console.log(`Server is listening on => http://localhost:${port}`);
});