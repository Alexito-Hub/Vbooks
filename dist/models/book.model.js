"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, { collection: 'Vbooks', versionKey: false });
const BOOK_MODEL_DATA = (0, mongoose_1.model)('Book', bookSchema);
exports.default = BOOK_MODEL_DATA;
