//  Création de la route Animal
import express from 'express';
import AnimalController from '../controllers/animalController'; // Import du contrôleur AnimalController
import { Schemas, ValidateJoi } from '../middleware/Joi'; // Import du middleware Joi pour valider les données de la requête HTTP

const router = express.Router();

// Définition des routes sur les animaux en utilisant les fonctions du contrôleur
router.post('/', AnimalController.createAnimal);
router.get('/', AnimalController.readAllAnimal);
router.get('/:animalId', AnimalController.readAnimal);
router.put('/:animalId', AnimalController.updateAnimal);
router.delete('/:animalId', AnimalController.deleteAnimal);

export default router; // Export du routeur pour être utilisé dans l'application principale
