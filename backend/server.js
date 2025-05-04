const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Initialisation d'Express
const app = express();

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:5173', // Port React
    credentials: true
}));

// Middleware pour le parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Route de déconnexion
app.post('/api/logout', (req, res) => {
    res.status(200).json({ message: 'Logged out' });
});

// Gestionnaire d'erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server started on port ${port}`.yellow.bold);
});