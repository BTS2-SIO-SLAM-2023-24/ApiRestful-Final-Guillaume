"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  Création de la route Animal
const express_1 = __importDefault(require("express"));
const animalController_1 = __importDefault(require("../controllers/animalController")); // Import du contrôleur AnimalController
const router = express_1.default.Router();
// Définition des routes sur les animaux en utilisant les fonctions du contrôleur
router.post('/', animalController_1.default.createAnimal);
router.get('/', animalController_1.default.readAllAnimal);
router.get('/:animalId', animalController_1.default.readAnimal);
router.put('/:animalId', animalController_1.default.updateAnimal);
router.delete('/:animalId', animalController_1.default.deleteAnimal);
exports.default = router; // Export du routeur pour être utilisé dans l'application principale
