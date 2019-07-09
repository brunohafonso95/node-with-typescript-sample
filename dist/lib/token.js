"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jwt = require("jsonwebtoken");
var httpStatus = require("http-status");
var response_1 = require("../utils/response");
var globalConfig_1 = require("../config/globalConfig");
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.prototype.generateToken = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, email, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = userData.id, email = userData.email;
                        return [4 /*yield*/, jwt.sign({
                                id: id,
                                email: email,
                            }, globalConfig_1.default.secret, {
                                expiresIn: '1hr',
                            })];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    Token.prototype.validateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, jwt.verify(token, globalConfig_1.default.secret, function (error, decoded) {
                            if (error) {
                                result = __assign({ success: false }, decoded);
                            }
                            else {
                                result = __assign({ success: true }, decoded);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Token.prototype.middleware = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var authHeader, tokenParts, scheme, token, authResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authHeader = req.headers.authorization;
                        if (!authHeader) {
                            return [2 /*return*/, response_1.default.errorResponse(res, { errorMessage: 'No token provided.' }, httpStatus.UNAUTHORIZED)];
                        }
                        tokenParts = authHeader.split(' ');
                        if (!(tokenParts.length === 1)) {
                            return [2 /*return*/, response_1.default.errorResponse(res, { errorMessage: 'The token informed is invalid.' }, httpStatus.UNAUTHORIZED)];
                        }
                        scheme = tokenParts[0], token = tokenParts[1];
                        if (!/^Bearer$/.test(scheme)) {
                            return [2 /*return*/, response_1.default.errorResponse(res, { errorMessage: 'The token informed is malformatted.' }, httpStatus.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.validateToken(token)];
                    case 1:
                        authResult = _a.sent();
                        if (!authResult.success) {
                            return [2 /*return*/, response_1.default.errorResponse(res, { errorMessage: 'Token invalid' }, httpStatus.UNAUTHORIZED)];
                        }
                        req.user = __assign({}, authResult);
                        return [2 /*return*/, next()];
                }
            });
        });
    };
    return Token;
}());
exports.default = new Token();
