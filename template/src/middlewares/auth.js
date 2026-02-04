"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(401, 'You are not authorized!');
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.accessSecret);
            if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
                throw new AppError_1.default(403, 'You are not authorized to perform this action!');
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            if (error instanceof AppError_1.default)
                throw error;
            throw new AppError_1.default(401, 'Unauthorized');
        }
    });
};
exports.default = auth;
//# sourceMappingURL=auth.js.map