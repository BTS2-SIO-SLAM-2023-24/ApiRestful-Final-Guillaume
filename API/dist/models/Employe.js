"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Schéma pour l'employé
const EmployeSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    // Champ pour les animaux, pouvant être un tableau de références à des animaux
    LesAnimaux: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Animal' }]
});
// Méthode pour calculer l'âge d'un employé
EmployeSchema.methods.calculerAge = function () {
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
EmployeSchema.methods.affecterAnimal = function (animalId) {
    this.LesAnimaux.push(animalId); // Affectez l'animal à l'employé
};
// méthode pour retirer l'animal
EmployeSchema.methods.retirerAnimal = function (animalId) {
    this.LesAnimaux.pull(animalId); // Retirez l'animal de l'employé
};
exports.default = mongoose_1.default.model('Employe', EmployeSchema);
