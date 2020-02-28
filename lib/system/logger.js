var bus = require('./bus'),
    config = bus.config;
var fs = require('fs');
const winston = require('winston');
const WinstonMongoDb = require('winston-mongodb').MongoDB;
const metaDataKeyName = 'meta';
const logLevel = 'debug';
var service = 'mars';
var dir = './logs';
var winstonConfig = {
    format: 'YYYY-MM-DD hh:mm:ss'
}
let transports = [];

if ( !fs.existsSync(dir) ) {
    fs.mkdirSync(dir);
}

if (config && config.get('logger') ) {
    winstonConfig = config.get('logger')
}

const logTransportConsole = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: winstonConfig.format
      }),
      winston.format.printf((info) => {
        let category = 'common_module';
        if (info && metaDataKeyName && info[metaDataKeyName] && info[metaDataKeyName].category) {
            category = info[metaDataKeyName].category;
        }
        return `[${info.timestamp}] [${info.level.toLocaleUpperCase()}] [${category}] ${info.message}`;
        //return `[${info.timestamp}] [${info.level.toLocaleUpperCase()}] ${info.message}`;
      }),
      winston.format.colorize({ all: true })
    ),
    level: logLevel
})
logTransportConsole.setMaxListeners(20)
transports.push(logTransportConsole);

const logTransportFileAll = new winston.transports.File({
    format: winston.format.combine(
      winston.format.timestamp({
        format: winstonConfig.format
      }),
      winston.format.printf((info) => {
        return `[${info.timestamp}] [${info.level.toLocaleUpperCase()}] [${info[metaDataKeyName].service}] [${info[metaDataKeyName].category}] ${info.message}`;
      })
    ),
    filename: './logs/all.log',
    level: logLevel
})
logTransportFileAll.setMaxListeners(20)
transports.push(logTransportFileAll);

if (winstonConfig.dbConnect) {
    console.log('winstonConfig.dbConnect', winstonConfig.dbConnect);
    const logTransportMongoDB = new WinstonMongoDb({
        collection: 'logs',
        db: winstonConfig.dbConnect,
        level: logLevel,
        format: winston.format.timestamp({
            format: winstonConfig.format
        }),
        metaKey: metaDataKeyName,
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    });
    logTransportMongoDB.setMaxListeners(20);
    transports.push(logTransportMongoDB);
}

class Logger {
    constructor(options) {
      this.category = 'common_module';
      this.service = service;

      if (options && options.service) {
        this.service = service = options.service;
      }
      if (options && options.category) {
        this.category = options.category;
      }
      this.logger = new winston.createLogger();
      this.logger.setMaxListeners(20);
      this.logger.configure({
        transports: transports,
        exitOnError: false,
        handleExceptions: false,
        format: winston.format.combine(
            winston.format.timestamp(winstonConfig.format),
        )
      });
    }
    createMessage(message, params) {
      message = JSON.stringify(message);
      let msg = {
        level: 'info',
        message: message,
        meta: {
          service: this.service,
          category: params.category || this.category
        }
      }

      if (params instanceof Object) {
        for (let key in params) {
          if (key == 'msg' || key == 'type') {
            continue;
          }
          msg['meta'][key] = params[key];
          if (key == 'id' && params[key]) {
            msg['message'] = '[' + params[key] + '] ' + msg['message'];
          }
        }
      }
      return msg;
    }
    log(message, params) {
      let msg = this.createMessage(message, params);
      msg['level'] = 'info';
      this.logger.log(msg);
    }
    info(message, params) {
        let msg = this.createMessage(message, params);
        msg['level'] = 'info';
        this.logger.log(msg);
    }
    debug(message, params) {
        let msg = this.createMessage(message, params);
        msg['level'] = 'debug';
        this.logger.log(msg);
    }
    warn(message, params) {
        let msg = this.createMessage(message, params);
        msg['level'] = 'warn';
        this.logger.log(msg);
    }
    error(message, params) {
        let msg = this.createMessage(message, params);
        msg['level'] = 'error';
        this.logger.log(msg);
    }
}

bus.getLogger = (options) => {
    return new Logger(options);
}
module.exports = Logger;