"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var compression = require("compression");
var fs = require("fs");
var logger_1 = require("./lib/logger");
var database_1 = require("./config/database");
var newsRouter_1 = require("./routes/newsRouter");
var App = /** @class */ (function () {
    function App() {
        this.server = express();
        this._database = new database_1.default();
        this._database.createConnection();
        this.createFileFolders();
        this.middlewares();
        this.routes();
    }
    App.prototype.routes = function () {
        this.server.use('/', newsRouter_1.default);
    };
    App.prototype.enableCors = function () {
        var options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.server.use(cors(options));
    };
    App.prototype.middlewares = function () {
        this.server.use(morgan(function (tokens, req, res) {
            return [
                tokens['remote-addr'](req, res),
                tokens['user-agent'](req, res),
                tokens.date(req, res),
                'HTTP/', tokens['http-version'](req, res),
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'), '-',
                tokens['response-time'](req, res), 'ms',
            ].join(' ');
        }, {
            stream: {
                write: function (message) {
                    console.info(message);
                    logger_1.default.info(message);
                }
            }
        }));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(compression());
        this.server.use('/exports', express.static(process.cwd() + "/exports"));
        this.enableCors();
    };
    App.prototype.createFileFolders = function () {
        if (fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }
        if (fs.existsSync('./exports')) {
            fs.mkdirSync('./exports');
        }
    };
    return App;
}());
exports.default = new App();
