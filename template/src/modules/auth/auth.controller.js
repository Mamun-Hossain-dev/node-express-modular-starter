"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const index_1 = __importDefault(require("../../config/index"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body;
    const result = await auth_service_1.authService.registerUser(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const result = await auth_service_1.authService.loginUser({ email, password });
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: index_1.default.env === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.authService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Access token refreshed successfully',
        data: result,
    });
});
const forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.body;
    const result = await auth_service_1.authService.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'OTP sent to your email',
        data: result,
    });
});
const verifyEmail = (0, catchAsync_1.default)(async (req, res) => {
    const { email, otp } = req.body;
    const result = await auth_service_1.authService.verifyEmail(email, otp);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Email verified successfully',
        data: result,
    });
});
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { email, newPassword } = req.body;
    const result = await auth_service_1.authService.resetPassword(email, newPassword);
    // Set the new refreshToken in cookie
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: index_1.default.env === 'production',
        // sameSite: 'strict',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password reset successfully',
        data: {
            accessToken: result.accessToken,
            user: result.user,
        },
    });
});
const logoutUser = (0, catchAsync_1.default)(async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: index_1.default.env === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged out successfully',
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const result = await auth_service_1.authService.changePassword(req.user?.id, oldPassword, newPassword);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully',
        data: result,
    });
});
exports.authController = {
    registerUser,
    loginUser,
    refreshToken,
    forgotPassword,
    verifyEmail,
    resetPassword,
    changePassword,
    logoutUser,
};
//# sourceMappingURL=auth.controller.js.map