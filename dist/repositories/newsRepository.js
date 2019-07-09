"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var newsSchema_1 = require("../models/newsSchema");
exports.default = mongoose.model('news', newsSchema_1.default);
