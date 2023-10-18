"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Création de la route Employe
const express_1 = __importDefault(require("express"));
const EmployeController_1 = __importDefault(require("../controllers/EmployeController")); // Import du contrôleur EmployeController
const router = express_1.default.Router();
// Définition des routes pour les employés en utilisant les fonctions du contrôleur
router.post('/', EmployeController_1.default.createEmploye);
router.get('/', EmployeController_1.default.readAllEmploye);
router.get('/:employeId', EmployeController_1.default.readEmploye);
router.put('/:employeId', EmployeController_1.default.updateEmploye);
router.patch('/:employeId', EmployeController_1.default.updateEmploye);
router.delete('/:employeId', EmployeController_1.default.deleteEmploye);
// calculer l'age d'un employé
router.get('/:employeId/age', EmployeController_1.default.calculerAge);
// affecter un animal à un employé
router.post('/:employeId/addAnimal/:animalId', EmployeController_1.default.affecterAnimal);
// retirer un animal à un employé
router.post('/:employeId/removeAnimal/:animalId', EmployeController_1.default.retirerAnimal);
exports.default = router; // Export du routeur pour être utilisé dans l'application principale
