// models/Employe.js
// Importez les modules nécessaires
import e from 'express';
import mongoose, { Schema, Document } from 'mongoose';

// Schéma pour l'employé
const EmployeSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true }, // Ajoutez un champ pour la date de naissance
    // Champ pour les animaux, pouvant être un tableau de références à des animaux
    LesAnimaux: [{ type: Schema.Types.ObjectId, ref: 'Animal' }]
});

// Modèle Interface pour typer les documents Employe
export interface EmployeModel extends Document {
    nom: string;
    prenom: string;
    dateNaissance: Date;
    calculerAge(): number; // Nouvelle méthode pour calculer l'âge
    // méthode pour associer un animal à l'employé
    affecterAnimal(animalId: mongoose.Types.ObjectId): void;
    retirerAnimal(animalId: mongoose.Types.ObjectId): void; // Nouvelle méthode pour retirer l'animal
    }


// Méthode pour calculer l'âge d'un employé
EmployeSchema.methods.calculerAge = function (): number {
    const aujourdHui = new Date();
    const dateNaissance = this.dateNaissance;
    const differenceAnnees = aujourdHui.getFullYear() - dateNaissance.getFullYear();

    // Vérifiez si l'anniversaire de l'employé n'a pas encore eu lieu cette année
    const anniversairePasse = aujourdHui.getMonth() > dateNaissance.getMonth() || (aujourdHui.getMonth() === dateNaissance.getMonth() && aujourdHui.getDate() >= dateNaissance.getDate());

    // Si l'anniversaire a déjà eu lieu cette année, l'âge est la différence d'années
    // Sinon, l'âge est la différence d'années moins 1
    return anniversairePasse ? differenceAnnees : differenceAnnees - 1;
};

//méthode pour associer un animal à l'employé
EmployeSchema.methods.affecterAnimal = function(animalId: mongoose.Types.ObjectId): void {
    this.LesAnimaux.push(animalId);  // Affectez l'animal à l'employé
   };

// méthode pour retirer l'animal
EmployeSchema.methods.retirerAnimal = function(animalId:mongoose.Types.ObjectId): void {
    this.LesAnimaux.pull(animalId);  // Retirez l'animal de l'employé
   
};

export default mongoose.model<EmployeModel>('Employe', EmployeSchema);
