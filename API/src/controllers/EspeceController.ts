// controllers/EspeceController.ts
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Espece from '../models/Espece';

// Fonction pour créer une nouvelle espèce
const createEspece = (req: Request, res: Response, next: NextFunction) => {
    const { nom } = req.body;

    // Création d'une nouvelle instance d'Espece avec les données fournies
    const espece = new Espece({
        _id: new mongoose.Types.ObjectId(),
        nom
    });

    return espece
        .save() // Sauvegarde de l'espèce dans la base de données
        .then((espece) => res.status(201).json({ espece })) // Réponse avec le statut 201 (Créé) et les détails de l'espèce créée
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour lire les détails d'une espèce en fonction de son identifiant
const readEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId; // Récupération de l'identifiant de l'espèce depuis les paramètres de la requête

    return Espece.findById(especeId) // Recherche de l'espèce correspondante dans la base de données
        .then((espece) => (espece ? res.status(200).json({ espece }) : res.status(404).json({ message: 'Espèce non trouvée' }))) // Réponse avec les détails de l'espèce ou un message d'erreur
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};
// Fonction pour récupérer la liste de toutes les espèces
const readAllEspece = (req: Request, res: Response, next: NextFunction) => {
    return Espece.find() // Recherche de toutes les espèces dans la base de données
        .then((especes) => res.status(200).json({ especes })) // Réponse avec la liste des espèces
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};
// Fonction pour mettre à jour les détails d'une espèce
const updateEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId; // Récupération de l'identifiant de l'espèce depuis les paramètres de la requête

    return Espece.findById(especeId) // Recherche de l'espèce correspondante dans la base de données
        .then((espece) => {
            if (espece) {
                espece.set(req.body); // Mise à jour des données de l'espèce avec les données fournies dans la requête

                return espece
                    .save() // Sauvegarde de l'espèce modifiée dans la base de données
                    .then((espece) => res.status(201).json({ espece })) // Réponse avec les détails de l'espèce mise à jour
                    .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
            } else {
                return res.status(404).json({ message: 'Espèce non trouvée' }); // Espèce non trouvée
            }
        })
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Fonction pour supprimer une espèce
const deleteEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId; // Récupération de l'identifiant de l'espèce depuis les paramètres de la requête

    return Espece.findByIdAndDelete(especeId) // Recherche de l'espèce correspondante dans la base de données
        .then((espece) => (espece ? res.status(201).json({ espece, message: 'Supprimée' }) : res.status(404).json({ message: 'Espèce non trouvée' }))) // Réponse avec les détails de l'espèce trouvée
        .catch((error) => res.status(500).json({ error })); // Gestion des erreurs
};

// Export des fonctions du contrôleur
export default {
    createEspece,
    readEspece,
    readAllEspece,
    updateEspece,
    deleteEspece
};
