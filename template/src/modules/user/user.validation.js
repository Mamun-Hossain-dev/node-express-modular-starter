"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPasswordZodSchema = exports.getAllUsersZodSchema = exports.getUserParamZodSchema = exports.updateUserZodSchema = exports.createUserZodSchema = exports.userBaseSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = __importDefault(require("zod"));
exports.userBaseSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(2, 'at least 2 characters'),
    lastName: zod_1.default.string().optional(),
    email: zod_1.default.string().email('must be a valid email'),
    password: zod_1.default.string().min(6, 'at least 6 characters'),
    role: zod_1.default.enum(['admin', 'user', 'guest']).default('user').optional(),
    profileImage: zod_1.default.string().url().optional(),
    profileImagePublicId: zod_1.default.string().optional(),
    bio: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
    location: zod_1.default.string().optional(),
    otp: zod_1.default.string().optional(),
});
exports.createUserZodSchema = zod_1.default.object({
    body: exports.userBaseSchema,
});
exports.updateUserZodSchema = zod_1.default.object({
    body: exports.userBaseSchema
        .pick({
        firstName: true,
        lastName: true,
        bio: true,
        phone: true,
        location: true,
        profileImage: true,
    })
        .partial(),
});
exports.getUserParamZodSchema = zod_1.default.object({
    params: zod_1.default.object({
        id: zod_1.default.string().refine(val => mongoose_1.Types.ObjectId.isValid(val), 'must be a valid MongoDB ObjectId'),
    }),
});
exports.getAllUsersZodSchema = zod_1.default.object({
    query: zod_1.default.object({
        // filtering
        searchTerm: zod_1.default.string().trim().optional(),
        firstName: zod_1.default.string().trim().optional(),
        lastName: zod_1.default.string().trim().optional(),
        email: zod_1.default.string().email().optional(),
        role: zod_1.default.enum(['admin', 'user', 'guest']).default('user').optional(),
        // pagination
        page: zod_1.default.coerce.number().positive().optional(),
        limit: zod_1.default.coerce.number().positive().max(100).optional(),
        // sorting
        sortBy: zod_1.default.enum(['firstName', 'lastName', 'email', 'createdAt', 'updatedAt']).optional(),
        sortOrder: zod_1.default.enum(['asc', 'desc']).optional(),
    }),
});
exports.updateUserPasswordZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        currentPassword: zod_1.default.string().min(6, 'at least 6 characters'),
        newPassword: zod_1.default.string().min(6, 'at least 6 characters'),
    }),
});
//# sourceMappingURL=user.validation.js.map