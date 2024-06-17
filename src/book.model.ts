import { Schema, model, Document } from 'mongoose';

export interface Book extends Document {
    author: string;
    isbn: string;
    publisher: string;
    publication_date: Date;
    languages: Language[];
    availability: boolean;
    reviews: Review[];
}

interface Language {
    language: string;
    title: string;
    number_of_pages: number;
    genre: string[];
    description: string;
    cover_url: string;
    download_links: {
        pdf: string;
        epub: string;
        mobi: string;
    };
}

interface Review {
    user: string;
    comment: string;
    rating: number;
}

const bookSchema = new Schema<Book>({
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    publication_date: { type: Date, required: true },
    languages: [
        {
            language: { type: String, required: true },
            title: { type: String, required: true },
            number_of_pages: { type: Number, required: true },
            genre: { type: [String], required: true },
            description: { type: String, required: true },
            cover_url: { type: String, required: true },
            download_links: {
                pdf: { type: String, required: true },
                epub: { type: String, required: true },
                mobi: { type: String, required: true },
            },
        },
    ],
    availability: { type: Boolean, required: true },
    reviews: [
        {
            user: { type: String, required: true },
            comment: { type: String, required: true },
            rating: { type: Number, required: true },
        },
    ],
});

const BOOK_MODEL_DATA = model<Book>('Book', bookSchema);

export default BOOK_MODEL_DATA;