import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as fs from 'fs';

import logger from './lib/logger';
import Database from './config/database';
import NewsRouter from './routes/newsRouter';

class App {
    public server: express.Application;
    private _database: Database; 

    constructor() {
        this.server = express();
        this._database = new Database();
        this._database.createConnection();
        this.createFileFolders();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.server.use('/', NewsRouter);
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.server.use(cors(options));
    }

    middlewares() {
        this.server.use(morgan((tokens, req, res) => {    
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
                write: function(message) {
                    console.info(message);
                    logger.info(message);
                } 
            }
        }));
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(compression());
        this.server.use('/exports', express.static(`${process.cwd()}/exports`));
        this.enableCors();
    }

    createFileFolders() {
        if(fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads')
        }

        if(fs.existsSync('./exports')) {
            fs.mkdirSync('./exports')
        }

    }
}

export default new App();