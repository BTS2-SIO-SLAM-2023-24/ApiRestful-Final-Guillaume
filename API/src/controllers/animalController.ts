import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Employe from '../models/Animal'; // Import du modèle Animal

// Fonction pour créer un nouvel animal
const createAnimal = (req: Request, res: Response, next: NextFunction) => {
    const { nom, espece } = req.body;
    // Création d'un nouvel animal
    const animal = new Employe({
        _id: new mongoose.Types.ObjectId(),
        nom,
        espece
    });
    // Sauvegarde de l'animal dans la base de données
    return animal
        .save()
        .then((animal) => res.status(201).json({ animal }))
        .catch((error) => res.status(500).json({ error }));
};

// Fonction pour récupérer un animal par son identifiant
const readAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId; // Récupération de l'identifiant de l'animal dans les paramètres de la requête HTTP
    return Employe.findById(animalId) // Recherche de l'animal correspondant dans la base de données
        .then((animal) => (animal ? res.status(200).json({ animal }) : res.status(404).json({ message: 'not found' }))) // Envoi de l'animal trouvé au client
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour récupérer tous les animaux
const readAllAnimal = (req: Request, res: Response, next: NextFunction) => {
    return Employe.find()
        .then((animals) => res.status(200).json({ animals }))
        .catch((error) => res.status(500).json({ error }));
};

// Fonction pour mettre à jour un animal
const updateAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId; // Récupération de l'identifiant de l'animal dans les paramètres de la requête HTTP
    return Employe.findById(animalId) // Recherche de l'animal correspondant dans la base de données
        .then((animal) => {
            if (animal) {
                animal.set(req.body); // Modification des données de l'animal avec les données de la requête HTTP
                return animal
                    .save() // Sauvegarde de l'animal modifié dans la base de données
                    .then((animal) => res.status(201).json({ animal })) // Envoi de l'animal modifié au client
                    .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour supprimer un animal
const deleteAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId; // Récupération de l'identifiant de l'animal dans les paramètres de la requête HTTP
    return Employe.findByIdAndDelete(animalId) // Recherche de l'animal correspondant dans la base de données
        .then((animal) => (animal ? res.status(201).json({ animal, message: 'Deleted' }) : res.status(404).json({ message: 'not found' }))) // Envoi de l'animal trouvé au client
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Export des fonctions du contrôleur
export default { createAnimal, readAnimal, readAllAnimal, updateAnimal, deleteAnimal };
