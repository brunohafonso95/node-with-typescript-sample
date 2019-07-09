"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var winston_1 = require("winston");
var Logger = /** @class */ (function () {
    function Logger() {
        this.logger = winston_1.createLogger({
            level: 'info',
            transports: [
                new winston_1.transports.File({
                    level: 'info',
                    filename: 'logs/app.log',
                    maxsize: 1048576,
                    maxFiles: 10
                }),
            ],
        });
        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }
    }
    return Logger;
}());
exports.default = new Logger().logger;
