"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animalController_1 = __importDefault(require("../controllers/animalController"));
const router = express_1.default.Router();
router.post('/', animalController_1.default.createAnimal);
router.get('/', animalController_1.default.readAllAnimal);
router.get('/:animalId', animalController_1.default.readAnimal);
router.put('/:animalId', animalController_1.default.updateAnimal);
router.delete('/:animalId', animalController_1.default.deleteAnimal);
exports.default = router;
