"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
(0, mongoose_1.connect)(connectionString, connectionOptions)
    .then(function () {
    console.log('Connected to MongoDB Atlas!');
})["catch"](function (e) {
    console.error('Error connecting to MongoDB Atlas:', e);
    process.exit(1);
});
