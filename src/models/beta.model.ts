import { Schema, model, Document } from 'mongoose';

export interface IBetaBook extends Document {
    autor: string;
    titulo: string;
    link: string;
}

const betaBookSchema = new Schema<IBetaBook>({
    autor: { type: String, required: true },
    titulo: { type: String, required: true },
    link: { type: String, required: true },
});

const BETA_BOOK_MODEL_DATA = model<IBetaBook>('BetaBook', betaBookSchema);

export default BETA_BOOK_MODEL_DATA;