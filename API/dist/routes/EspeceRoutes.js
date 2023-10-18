"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Création de la route Espece
const express_1 = __importDefault(require("express"));
const EspeceController_1 = __importDefault(require("../controllers/EspeceController")); // Import du contrôleur EspeceController
const router = express_1.default.Router();
// Définition des routes pour les opérations CRUD sur les espèces en utilisant les fonctions du contrôleur
router.post('/', EspeceController_1.default.createEspece);
router.get('/', EspeceController_1.default.readAllEspece);
router.get('/:especeId', EspeceController_1.default.readEspece);
router.put('/:especeId', EspeceController_1.default.updateEspece);
router.delete('/:especeId', EspeceController_1.default.deleteEspece);
exports.default = router; // Export du routeur pour être utilisé dans l'application principale
