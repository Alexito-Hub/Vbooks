import { BOOK_MODEL_DATA } from '../models/book.model';
import * as SpellChecker from 'spellchecker';

type SearchParams = {
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    isbn?: string;
    fragment?: boolean;
};

type QueryFields = {
    [K in keyof SearchParams]: K extends 'isbn' ? string : string | RegExp;
};

async function getVbooks(searchParams: SearchParams): Promise<{ books: BookInterface[], query: any }> {
    const { isbn, fragment, ...restSearchParams } = searchParams;
    const query: QueryFields = {};

    for (const key in restSearchParams) {
        const value = restSearchParams[key as keyof typeof restSearchParams];
        query[`languages.${key}`] = typeof value === 'string' && key !== 'fragment'
            ? SpellChecker.isMisspelled(value) ? { $regex: SpellChecker.getCorrectionsForMisspelling(value)[0], $options: 'i' } : value
            : value;
    }

    try {
        const books = await BOOK_MODEL_DATA.find(query);
        return { books };
    } catch (e) {
        throw new Error('Error fetching books: ' + e.message);
    }
}