import winston, { format } from "winston";
import appRootPath from "app-root-path";

const options = {
    File: {
        level: 'info',
        filename: `${appRootPath}/logs/app.log`,
        handleExceptions: true,
        format: winston.format.json(),
        maxSize: 5000000, // 5 MB
        maxFile: 5,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }
}

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.File),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
})

logger.stream = {
    write: function (message) {
        logger.info(message.trim())
    }
}

export default logger
