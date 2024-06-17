import BOOK_MODEL_DATA, { Book as BookInterface } from './models/book.model';
import BETA_BOOK_MODEL_DATA, { BetaBook as BetaBookInterface } from './models/beta.model';
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
        throw new Error('Error fetching books: ' + error.message);
    }
}

async function getVbeta(searchParams: {
    autor?: string;
    título?: string;
}): Promise<{ books: BetaBookInterface[], query: any }> {
    const { autor, título } = searchParams;
    const query: any = {};

    if (autor) {
        query['autor'] = { $regex: new RegExp(tokenizer.tokenize(autor).join('|')), $options: 'i' };
    }

    if (título) {
        query['título'] = { $regex: new RegExp(tokenizer.tokenize(título).join('|')), $options: 'i' };
    }

    try {
        const books = await BETA_BOOK_MODEL_DATA.find(query);
        return { books, query };
    } catch (error) {
        throw new Error('Error fetching beta books: ' + error.message);
    }
}

export { getVbooks, getVbeta };