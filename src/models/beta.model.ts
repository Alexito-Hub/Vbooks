import { Schema, model } from 'mongoose';

export interface BetaBook {
    _id: string;
    autor: string;
    titulo: string;
    link: string;
}

const betaBookSchema = new Schema<BetaBook>({
    autor: { type: String, required: true },
    titulo: { type: String, required: true },
    link: { type: String, required: true },
});

const BETA_BOOK_MODEL_DATA = model<BetaBook>('BetaBook', betaBookSchema);

export { BETA_BOOK_MODEL_DATA };