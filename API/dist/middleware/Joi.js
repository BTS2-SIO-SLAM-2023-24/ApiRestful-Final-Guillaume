"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.ValidateJoi = void 0;
// middleware/Joi.ts
const joi_1 = __importDefault(require("joi"));
const Logging_1 = __importDefault(require("../library/Logging"));
// Cette fonction middleware prend un schéma Joi en tant que paramètre
// et valide le corps de la requête HTTP en fonction de ce schéma.
// Si la validation réussit, elle passe au middleware suivant.
// Sinon, elle renvoie une réponse d'erreur 422 avec les détails de l'erreur de validation.
const ValidateJoi = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Utilisation de Joi pour valider le corps de la requête par rapport au schéma donné
            yield schema.validateAsync(req.body);
            // Si la validation réussit, passe au middleware suivant
            next();
        }
        catch (error) {
            // En cas d'erreur de validation, enregistre l'erreur et renvoie une réponse d'erreur 422
            Logging_1.default.error(error);
            return res.status(422).json({ error });
        }
    });
};
exports.ValidateJoi = ValidateJoi;
// Définition de schémas de validation pour les données
// Ces schémas sont utilisés dans le middleware ci-dessus pour valider les requêtes.
exports.Schemas = {
    Employe: {
        create: joi_1.default.object({
            nom: joi_1.default.string().required(),
            prenom: joi_1.default.string().required(),
            dateNaissance: joi_1.default.date().required(),
            LesAnimaux: joi_1.default.array().items(joi_1.default.string().required())
        }),
        update: joi_1.default.object({
            nom: joi_1.default.string(),
            prenom: joi_1.default.string(),
            dateNaissance: joi_1.default.date(),
            LesAnimaux: joi_1.default.array().items(joi_1.default.string().required())
        })
    },
    Animal: {
        create: joi_1.default.object({
            nom: joi_1.default.string().required(),
            espece: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            nom: joi_1.default.string(),
            espece: joi_1.default.string()
        })
    },
    Espece: {
        create: joi_1.default.object({
            nom: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            nom: joi_1.default.string()
        })
    }
};
