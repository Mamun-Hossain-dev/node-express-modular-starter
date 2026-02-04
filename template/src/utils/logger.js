"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf, colorize } = winston_1.default.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(label({ label: 'App' }), timestamp(), myFormat),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), myFormat),
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(process.cwd(), 'logs', 'error.log'),
            level: 'error',
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(process.cwd(), 'logs', 'success.log'),
            level: 'info',
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map