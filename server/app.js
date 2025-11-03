const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // ✅ add this

// Dotenv
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 5000;

// Mongoose
require('./db/connect');
app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS for both local and deployed frontend
app.use(cors({
    origin: [
        'http://localhost:3000',                // your local React app
        'https://your-frontend-name.vercel.app' // your deployed frontend link
    ],
    credentials: true // allows cookies / tokens to be sent
}));

// Express Router
app.use(require('./routes/auth'));

// Start server
app.listen(port, () => {
    console.log(`Server is listening on => http://localhost:${port}`);
});
