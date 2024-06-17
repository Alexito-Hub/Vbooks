import BOOK_MODEL_DATA, { Book as BookInterface } from './book.model';
import * as natural from 'natural';

const tokenizer = new natural.WordTokenizer();

async function getVbooks(searchParams: {
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    isbn?: string;
    fragment?: boolean;
}): Promise<{ books: BookInterface[], query: any }> {
    const { isbn, fragment, ...restSearchParams } = searchParams;
    const query: any = {};

    for (const key in restSearchParams) {
        const value = restSearchParams[key as keyof typeof restSearchParams];
        query[`languages.${key}`] = typeof value === 'string' && key !== 'fragment'
            ? { $regex: new RegExp(tokenizer.tokenize(value).join('|')), $options: 'i' }
            : value;
    }

    if (isbn) {
        query.isbn = isbn;
    }

    try {
        const books = await BOOK_MODEL_DATA.find(query);
        return { books, query };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching books: ' + error.message);
        } else {
            throw new Error('Unknown error fetching books');
        }
    }
}

export { getVbooks };