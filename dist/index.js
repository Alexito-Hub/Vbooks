"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVbeta = exports.getVbooks = void 0;
const book_model_1 = __importDefault(require("./models/book.model"));
const beta_model_1 = __importDefault(require("./models/beta.model"));
const natural = __importStar(require("natural"));
const tokenizer = new natural.WordTokenizer();
async function getVbooks(searchParams) {
    const { isbn, fragment, ...restSearchParams } = searchParams;
    const query = {};
    for (const key in restSearchParams) {
        const value = restSearchParams[key];
        query[`languages.${key}`] = typeof value === 'string' && key !== 'fragment'
            ? { $regex: new RegExp(tokenizer.tokenize(value).join('|')), $options: 'i' }
            : value;
    }
    if (isbn) {
        query.isbn = isbn;
    }
    try {
        const books = await book_model_1.default.find(query);
        return { books, query };
    }
    catch (error) {
        throw new Error('Error fetching books: ' + error);
    }
}
exports.getVbooks = getVbooks;
async function getVbeta(searchParams) {
    const { autor, titulo } = searchParams;
    const query = {};
    if (autor) {
        query['autor'] = { $regex: new RegExp(tokenizer.tokenize(autor).join('|')), $options: 'i' };
    }
    if (titulo) {
        query['titulo'] = { $regex: new RegExp(tokenizer.tokenize(titulo).join('|')), $options: 'i' };
    }
    try {
        const books = await beta_model_1.default.find(query);
        return { books, query };
    }
    catch (error) {
        throw new Error('Error fetching beta books: ' + error);
    }
}
exports.getVbeta = getVbeta;
