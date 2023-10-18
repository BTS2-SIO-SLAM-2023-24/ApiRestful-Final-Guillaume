// Création de la route Espece
import express from 'express';
import EspeceController from '../controllers/EspeceController'; // Import du contrôleur EspeceController
import { Schemas, ValidateJoi } from '../middleware/Joi'; // Import du middleware Joi pour valider les données de la requête HTTP

const router = express.Router();

// Définition des routes pour les opérations CRUD sur les espèces en utilisant les fonctions du contrôleur

router.post('/', EspeceController.createEspece);
router.get('/', EspeceController.readAllEspece);
router.get('/:especeId', EspeceController.readEspece);
router.put('/:especeId', EspeceController.updateEspece);
router.delete('/:especeId', EspeceController.deleteEspece);

export default router; // Export du routeur pour être utilisé dans l'application principale
