"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
let server;
const main = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.mongoUri);
        logger_1.default.info('Connected to the database successfully');
        server = app_1.default.listen(config_1.default.port, () => {
            logger_1.default.info(`Server is running on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to connect to the database', error);
        process.exit(1);
    }
};
main();
process.on('unhandledRejection', err => {
    logger_1.default.error(`Unhandled Rejection is detected, shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('uncaughtException', err => {
    logger_1.default.error(`Uncaught Exception is detected, shutting down ...`, err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map