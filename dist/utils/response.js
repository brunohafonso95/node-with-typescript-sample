"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var httpStatus = require("http-status");
var Response = /** @class */ (function () {
    function Response() {
    }
    Response.prototype.defaultResponse = function (res, data, statusCode) {
        if (statusCode === void 0) { statusCode = httpStatus.OK; }
        res.status(statusCode).json(data);
    };
    Response.prototype.errorResponse = function (res, errorData, statusCode) {
        if (statusCode === void 0) { statusCode = httpStatus.BAD_REQUEST; }
        this.defaultResponse(res, errorData, statusCode);
    };
    return Response;
}());
exports.default = new Response();
