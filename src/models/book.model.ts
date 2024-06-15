import { Schema, model } from 'mongoose';
import { Book as BookInterface } from '../src/interfaces/book.interface';

const bookSchema = new Schema<BookInterface>({
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

const BOOK_MODEL_DATA = model<BookInterface>('Book', bookSchema);

export default BOOK_MODEL_DATA;