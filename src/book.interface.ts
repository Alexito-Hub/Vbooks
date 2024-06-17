import { Document } from 'mongoose';

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