"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newsRepository_1 = require("../repositories/newsRepository");
var NewsService = /** @class */ (function () {
    function NewsService() {
    }
    NewsService.prototype.getAll = function (actualPage, pageSize) {
        if (actualPage === void 0) { actualPage = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return newsRepository_1.default.find().sort({ publishDate: -1 })
            .skip((actualPage - 1) * pageSize)
            .limit(pageSize);
    };
    NewsService.prototype.getById = function (_id) {
        return newsRepository_1.default.findById(_id);
    };
    NewsService.prototype.create = function (news) {
        return newsRepository_1.default.create(news);
    };
    NewsService.prototype.update = function (_id, news) {
        return newsRepository_1.default.findByIdAndUpdate(_id, news);
    };
    NewsService.prototype.delete = function (_id) {
        return newsRepository_1.default.findByIdAndRemove(_id);
    };
    return NewsService;
}());
exports.default = new NewsService();
