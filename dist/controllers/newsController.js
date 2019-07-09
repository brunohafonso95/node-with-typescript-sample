"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis = require("redis");
var newsService_1 = require("../services/newsService");
var response_1 = require("../utils/response");
var exportFiles_1 = require("../lib/exportFiles");
var NewsController = /** @class */ (function () {
    function NewsController() {
    }
    NewsController.prototype.get = function (req, res) {
        var client;
        if (process.env.DOCKER_ENV) {
            client = redis.createClient(6379, 'redis');
        }
        client = redis.createClient();
        client.get('news', function (err, reply) {
            if (reply) {
                return response_1.default.defaultResponse(res, { news: JSON.parse(reply) });
            }
            var _a = req.query, page = _a.page, pagesize = _a.pagesize;
            page = page ? parseInt(page) : 1;
            pagesize = pagesize ? parseInt(pagesize) : 10;
            newsService_1.default.getAll(page, pagesize)
                .then(function (news) {
                client.set('news', JSON.stringify(news));
                client.expire('news', 20);
                response_1.default.defaultResponse(res, { news: news });
            })
                .catch(function (error) { return response_1.default.errorResponse(res, { errorMessage: "error to get news - " + error.message }); });
        });
    };
    NewsController.prototype.exportCsv = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newsList, fields, csv, fileName, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, newsService_1.default.getAll()];
                    case 1:
                        newsList = _a.sent();
                        fields = [
                            '_id',
                            'hat',
                            'title',
                            'text',
                            'author',
                            'img',
                            'publishDate',
                            'link',
                            'active'
                        ];
                        csv = exportFiles_1.default.toCsv(newsList, fields);
                        fileName = exportFiles_1.default.saveCsvFile('./exports', csv);
                        res.redirect("/exports/" + fileName);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        response_1.default.errorResponse(res, { errorMessage: "error to export file - " + error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NewsController.prototype.getById = function (req, res) {
        newsService_1.default.getById(req.params.id)
            .then(function (newsItem) {
            if (!newsItem) {
                return response_1.default.defaultResponse(res, { errorMessage: 'new not found' }, 404);
            }
            response_1.default.defaultResponse(res, { newsItem: newsItem });
        })
            .catch(function (error) { return response_1.default.errorResponse(res, { errorMessage: "error to get new - " + error.message }); });
    };
    NewsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                newsService_1.default.create(req.body)
                    .then(function (newCreated) { return response_1.default.defaultResponse(res, { newCreated: newCreated }, 201); })
                    .catch(function (error) { return response_1.default.errorResponse(res, { errorMessage: "error to create new - " + error.message }); });
                return [2 /*return*/];
            });
        });
    };
    NewsController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                newsService_1.default.update(req.params.id, req.body)
                    .then(function () { return response_1.default.defaultResponse(res, { message: 'new updated with success' }); })
                    .catch(function (error) { return response_1.default.errorResponse(res, { errorMessage: "error to update new - " + error.message }); });
                return [2 /*return*/];
            });
        });
    };
    NewsController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                newsService_1.default.delete(req.params.id)
                    .then(function () { return response_1.default.defaultResponse(res, '', 204); })
                    .catch(function (error) { return response_1.default.errorResponse(res, { errorMessage: "error to delete new - " + error.message }); });
                return [2 /*return*/];
            });
        });
    };
    return NewsController;
}());
exports.default = new NewsController();
