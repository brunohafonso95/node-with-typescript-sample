"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var uuid = require("uuid");
var json2csv = require("json2csv");
var ExportFiles = /** @class */ (function () {
    function ExportFiles() {
    }
    ExportFiles.prototype.toCsv = function (jsonContent, fields) {
        try {
            return json2csv.parse(jsonContent, { fields: fields });
        }
        catch (error) {
            throw new Error("Error to convert to csv - " + error.message);
        }
    };
    ExportFiles.prototype.saveCsvFile = function (pathToSave, content) {
        try {
            var fileName = uuid.v4() + ".csv";
            fs.writeFileSync(pathToSave + "/" + fileName, content);
            return fileName;
        }
        catch (error) {
            throw new Error("Error to export csv file - " + error.message);
        }
    };
    return ExportFiles;
}());
exports.default = new ExportFiles();
