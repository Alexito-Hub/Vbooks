"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const betaBookSchema = new mongoose_1.Schema({
    autor: { type: String, required: true },
    titulo: { type: String, required: true },
    link: { type: String, required: true },
}, { collection: 'Books', versionKey: false });
const BETA_BOOK_MODEL_DATA = (0, mongoose_1.model)('BetaBook', betaBookSchema);
exports.default = BETA_BOOK_MODEL_DATA;
