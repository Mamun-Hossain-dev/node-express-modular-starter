"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const index_1 = __importDefault(require("../../config/index"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createOtpTemplate_1 = __importDefault(require("../../utils/createOtpTemplate"));
const jwtHelper_1 = require("../../utils/jwtHelper");
const otp_1 = require("../../utils/otp");
const sendMailer_1 = __importDefault(require("../../utils/sendMailer"));
const user_model_1 = require("../user/user.model");
const registerUser = async (payload) => {
    const existingUser = await user_model_1.User.findByEmail(payload.email);
    if (existingUser) {
        throw new AppError_1.default(400, 'User with this email already exists');
    }
    const idx = Math.floor(Math.random() * 1000);
    const user = await new user_model_1.User({
        ...payload,
        profileImage: `https://avatar.iran.liara.run/public/${idx}.png`,
    });
    await user.save();
    return user;
};
const loginUser = async (payload) => {
    const user = await user_model_1.User.findByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(401, 'Invalid email or password');
    }
    const isPasswordValid = await user.isPasswordMatched(payload.password);
    if (!isPasswordValid) {
        throw new AppError_1.default(401, 'Invalid email or password');
    }
    if (!user.verified) {
        throw new AppError_1.default(403, 'Please verify your email to login');
    }
    const accessToken = jwtHelper_1.jwtHelper.generateToken({
        userId: user._id,
        role: user.role,
        email: user.email,
    }, index_1.default.jwt.accessSecret, index_1.default.jwt.accessExpiresIn);
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({
        userId: user._id,
        role: user.role,
        email: user.email,
    }, index_1.default.jwt.refreshSecret, index_1.default.jwt.refreshExpiresIn);
    const userWithOutPassword = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userWithOutPassword;
    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
    };
};
const refreshToken = async (token) => {
    const verifiedToken = jwtHelper_1.jwtHelper.verifyToken(token, index_1.default.jwt.refreshSecret);
    if (!verifiedToken.userId) {
        throw new AppError_1.default(401, 'Invalid refresh token');
    }
    const user = await user_model_1.User.findById(verifiedToken.userId);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    const accessToken = jwtHelper_1.jwtHelper.generateToken({
        userId: user._id,
        role: user.role,
        email: user.email,
    }, index_1.default.jwt.accessSecret, index_1.default.jwt.accessExpiresIn);
    return {
        accessToken,
    };
};
const forgotPassword = async (email) => {
    const user = await user_model_1.User.findByEmail(email);
    if (!user) {
        throw new AppError_1.default(404, 'User not found!');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = await (0, otp_1.hashOtp)(otp);
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();
    await (0, sendMailer_1.default)(user.email, 'Reset Password OTP', (0, createOtpTemplate_1.default)(otp, user.email, 'NodeExpressStarter'));
    return { message: 'OTP send to your email' };
};
const verifyEmail = async (email, otp) => {
    const user = await user_model_1.User.findByEmail(email);
    if (!user) {
        throw new AppError_1.default(404, 'User not found!');
    }
    if (!user.otp || !user.otpExpiry) {
        throw new AppError_1.default(404, 'otp not found');
    }
    if (user.otpExpiry < new Date()) {
        throw new AppError_1.default(400, 'OTP expired');
    }
    const isOtpValid = await (0, otp_1.compareOtp)(otp, user.otp);
    if (!isOtpValid) {
        throw new AppError_1.default(400, 'Invalid OTP');
    }
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return { message: 'Email verified successfully' };
};
const resetPassword = async (email, newPassword) => {
    const user = await user_model_1.User.findByEmail(email);
    if (!user)
        throw new AppError_1.default(404, 'User not found');
    // if (!user.verified) throw new AppError(404, 'User are not verified')
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    // Auto-login after reset
    const accessToken = jwtHelper_1.jwtHelper.generateToken({ id: user._id, role: user.role, email: user.email }, index_1.default.jwt.accessSecret, index_1.default.jwt.accessExpiresIn);
    const refreshToken = jwtHelper_1.jwtHelper.generateToken({ id: user._id, role: user.role, email: user.email }, index_1.default.jwt.refreshSecret, index_1.default.jwt.refreshExpiresIn);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithOutPassword } = user.toObject();
    return {
        accessToken,
        refreshToken,
        user: userWithOutPassword,
    };
};
const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await user_model_1.User.findById(userId).select('+password');
    if (!user)
        throw new AppError_1.default(404, 'user not found');
    const isPasswordMatched = await user.isPasswordMatched(oldPassword);
    if (!isPasswordMatched)
        throw new AppError_1.default(400, 'Password not matched');
    user.password = newPassword;
    await user.save();
    return { message: 'Password changed successfully' };
};
exports.authService = {
    registerUser,
    loginUser,
    refreshToken,
    forgotPassword,
    verifyEmail,
    resetPassword,
    changePassword,
};
//# sourceMappingURL=auth.service.js.map