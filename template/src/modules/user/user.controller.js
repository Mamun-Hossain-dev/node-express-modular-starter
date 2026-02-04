"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const pick_1 = __importDefault(require("../../utils/pick"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.userService.createUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: result,
    });
});
const getUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.userService.getUserById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const filterOptions = (0, pick_1.default)(req.query, ['searchTerm', 'firstName', 'lastName', 'email', 'role']);
    const paginationOptions = (0, pick_1.default)(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const result = await user_service_1.userService.getAllUsers(filterOptions, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});
const updateUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const imageFile = req.file;
    const updateData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const result = await user_service_1.userService.updateUserById(id, updateData, imageFile);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
});
const deleteUserById = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.userService.deleteUserById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
});
exports.userController = {
    createUser,
    getUserById,
    getAllUsers,
    deleteUserById,
    updateUserById,
};
//# sourceMappingURL=user.controller.js.map