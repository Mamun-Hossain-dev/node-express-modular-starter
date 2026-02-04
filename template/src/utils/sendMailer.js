"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const transporter = nodemailer_1.default.createTransport({
    host: config_1.default.email.host,
    port: Number(config_1.default.email.port),
    secure: Number(config_1.default.email.port) === 465, // true for 465, false for other ports
    auth: {
        user: config_1.default.email.user,
        pass: config_1.default.email.pass,
    },
});
const sendMailer = async (email, subject, html) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const info = await transporter.sendMail({
            from: config_1.default.email.from,
            to: email,
            subject,
            html,
        });
    }
    catch (err) {
        throw new AppError_1.default(500, 'Failed to send email!', err instanceof Error ? err.message : '');
    }
};
exports.default = sendMailer;
//# sourceMappingURL=sendMailer.js.map