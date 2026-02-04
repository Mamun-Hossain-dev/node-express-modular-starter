"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareOtp = exports.hashOtp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const hashOtp = async (otp) => {
    return await bcryptjs_1.default.hash(otp, config_1.default.bcryptSaltRounds);
};
exports.hashOtp = hashOtp;
const compareOtp = async (otp, hashedOtp) => {
    return await bcryptjs_1.default.compare(otp, hashedOtp);
};
exports.compareOtp = compareOtp;
//# sourceMappingURL=otp.js.map