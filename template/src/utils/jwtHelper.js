"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const generateToken = (payload, secretKey, expiresIn) => {
    const options = {
        expiresIn,
        algorithm: 'HS256',
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
const verifyToken = (token, secretKey) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch {
        throw new AppError_1.default(401, 'Unauthorized: Invalid or expired token');
    }
};
exports.jwtHelper = {
    generateToken,
    verifyToken,
};
//# sourceMappingURL=jwtHelper.js.map