import express from 'express';
import AnimalController from '../controllers/animalController';

const router = express.Router();

router.post('/', AnimalController.createAnimal);
router.get('/', AnimalController.readAllAnimal);
router.get('/:animalId', AnimalController.readAnimal);
router.put('/:animalId', AnimalController.updateAnimal);
router.delete('/:animalId', AnimalController.deleteAnimal);

export default router;
