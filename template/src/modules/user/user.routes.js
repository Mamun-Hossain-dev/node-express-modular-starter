"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(user_validation_1.createUserZodSchema), user_controller_1.userController.createUser);
router.get('/:id', (0, validateRequest_1.default)(user_validation_1.getUserParamZodSchema), user_controller_1.userController.getUserById);
router.get('/', (0, validateRequest_1.default)(user_validation_1.getAllUsersZodSchema), user_controller_1.userController.getAllUsers);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.getUserParamZodSchema), (0, validateRequest_1.default)(user_validation_1.updateUserZodSchema), user_controller_1.userController.updateUserById);
router.delete('/:id', (0, validateRequest_1.default)(user_validation_1.getUserParamZodSchema), user_controller_1.userController.deleteUserById);
exports.userRoutes = router;
//# sourceMappingURL=user.routes.js.map