"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_constants_1 = require("../user/user.constants");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.RegisterUserZodSchema), auth_controller_1.authController.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.LoginUserZodSchema), auth_controller_1.authController.loginUser);
router.post('/refresh-token', auth_controller_1.authController.refreshToken);
router.post('/forgot-password', (0, validateRequest_1.default)(auth_validation_1.ForgotPasswordZodSchema), auth_controller_1.authController.forgotPassword);
router.post('/verify-email', (0, validateRequest_1.default)(auth_validation_1.VerifyEmailZodSchema), auth_controller_1.authController.verifyEmail);
router.post('/reset-password', (0, validateRequest_1.default)(auth_validation_1.ResetPasswordZodSchema), auth_controller_1.authController.resetPassword);
router.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.ChangePasswordZodSchema), (0, auth_1.default)(user_constants_1.userRole.admin, user_constants_1.userRole.user), auth_controller_1.authController.changePassword);
router.post('/logout', auth_controller_1.authController.logoutUser);
exports.authRoutes = router;
//# sourceMappingURL=auth.routes.js.map