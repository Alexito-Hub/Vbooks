"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
(0, mongoose_1.connect)("mongodb+srv://books:yY0jOC6onDDXBnZY@serverdatadb.39fv13g.mongodb.net/?retryWrites=true&w=majority&appName=ServerDataDB")
    .then(() => {
    console.log('Connected to MongoDB Atlas!');
})
    .catch((e) => {
    console.error('Error connecting to MongoDB Atlas:', e);
    process.exit(1);
});
