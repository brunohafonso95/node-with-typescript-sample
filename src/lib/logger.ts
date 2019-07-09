import * as fs from 'fs';
import { createLogger, transports } from 'winston'

class Logger {
    constructor() {
        if (!fs.existsSync('./logs')) {
            fs.mkdirSync('./logs');
        }
    }

    logger = createLogger({
        level: 'info',
        transports: [
            new transports.File({
                level: 'info',
                filename: 'logs/app.log',
                maxsize: 1048576,
                maxFiles: 10
            }),
        ],
    });
}

export default new Logger().logger;