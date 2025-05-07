require('dotenv').config({ path: './.env' });
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// CORS setup
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use your secret key from .env or a default one
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true in production (HTTPS required)
}));

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
app.use('/api/users', require('./routes/userRoutes'));
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`.yellow.bold);
});
