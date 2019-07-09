"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var NewsSchema = new mongoose.Schema({
    hat: { type: String },
    title: { type: String },
    text: { type: String },
    author: { type: String },
    img: { type: String },
    publishData: { type: Date },
    link: { type: String },
    active: { type: Boolean }
});
exports.default = NewsSchema;
