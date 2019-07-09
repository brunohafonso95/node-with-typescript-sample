"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Database = /** @class */ (function () {
    function Database() {
        this.dbUrl = process.env.DBURL || 'mongodb://localhost:27017/db_portal';
    }
    Database.prototype.createConnection = function () {
        mongoose.connect(this.dbUrl, { useNewUrlParser: true });
    };
    return Database;
}());
exports.default = Database;
