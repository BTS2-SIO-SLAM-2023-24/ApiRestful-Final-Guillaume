import mongoose, { Schema, Document } from 'mongoose';
// Schéma pour l'espèce
const EspeceSchema = new Schema({
    nom: { type: String, required: true }
});

// Modèle pour l'espèce
export interface EspeceModel extends Document {
    nom: string;
}
export default mongoose.model<EspeceModel>('Espece', EspeceSchema);
