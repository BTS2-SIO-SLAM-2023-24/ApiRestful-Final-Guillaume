// Importation des modules nécessaires
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import employeRoutes from './routes/EmployeRoutes';
import animalRoutes from './routes/AnimalsRoutes';
import especeRoutes from './routes/EspeceRoutes';

// Création d'une instance d'Express
const router = express();

/** Connexion à la base de données MongoDB */
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' }) // Connexion à MongoDB en utilisant la configuration spécifiée dans config.mongo.url
    .then(() => {
        Logging.info('Mongo connected successfully.'); // Journalisation de la réussite de la connexion à MongoDB
        StartServer(); // Démarrage du serveur Express une fois que la connexion à la base de données est établie
    })
    .catch((error) => Logging.error(error)); // Gestion des erreurs de connexion à MongoDB

/** Démarrage du serveur Express uniquement si la connexion à MongoDB réussi */
const StartServer = () => {
    /** Middleware pour journaliser les requêtes entrantes et les réponses sortantes */
    router.use((req, res, next) => {
        /** Journalisation de la requête entrante */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Journalisation de la réponse sortante après l'envoi au client */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next(); // Passer la main au middleware suivant
    });

    // Configuration d'Express pour gérer les données POST et JSON
    router.use(express.urlencoded({ extended: true })); // Middleware pour gérer les données POST
    router.use(express.json()); // Middleware pour gérer les données JSON

    // Middleware pour gérer les règles de l'API, les en-têtes CORS, etc.
    router.use((req, res, next) => {
        // Configuration des en-têtes CORS pour permettre l'accès depuis n'importe quelle origine ('*')
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            // Configuration des méthodes HTTP autorisées lors de la pré-vérification CORS (OPTIONS)
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next(); // Passer la main au middleware suivant
    });

    // Définition des routes de l'API

    router.use('/employes', employeRoutes); // Les routes liées aux employes sont définies dans employeRoutes
    router.use('/animals', animalRoutes); // Les routes liées aux animaux
    router.use('/especes', especeRoutes); // Les routes liées aux espèces

    // une route simple pour vérifier que le serveur fonctionne
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Bienvenue dans ton API' }));
    // Ajoutez cette ligne après vos autres routes
    router.get('/', (req, res, next) => res.status(200).json({ message: 'Bienvenue dans ton API' }));

    // Middleware de gestion des erreurs pour les routes non trouvées
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    // Création du serveur HTTP en utilisant Express et écoute sur le port configuré
    http.createServer(router).listen(config.server.port, () => Logging.info(`Le serveur est en cours d'exécution sur le port ${config.server.port}`));
};
