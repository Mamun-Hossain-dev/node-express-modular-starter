"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordZodSchema = exports.ResetPasswordZodSchema = exports.VerifyEmailZodSchema = exports.ForgotPasswordZodSchema = exports.LoginUserZodSchema = exports.RegisterUserZodSchema = void 0;
const zod_1 = require("zod");
const user_validation_1 = require("../user/user.validation");
exports.RegisterUserZodSchema = zod_1.z.object({
    body: user_validation_1.userBaseSchema
        .pick({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true,
        profileImage: true,
    })
        .partial({
        role: true,
        profileImage: true,
    }),
});
exports.LoginUserZodSchema = zod_1.z.object({
    body: user_validation_1.userBaseSchema
        .pick({
        email: true,
        password: true,
    })
        .required(),
});
exports.ForgotPasswordZodSchema = zod_1.z.object({
    body: user_validation_1.userBaseSchema
        .pick({
        email: true,
    })
        .required(),
});
exports.VerifyEmailZodSchema = zod_1.z.object({
    body: user_validation_1.userBaseSchema
        .pick({
        email: true,
        otp: true,
    })
        .required(),
});
exports.ResetPasswordZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        newPassword: zod_1.z.string().min(6),
    }),
});
exports.ChangePasswordZodSchema = zod_1.z.object({
    params: user_validation_1.getUserParamZodSchema.shape.params,
    body: zod_1.z.object({
        oldPassword: zod_1.z.string().min(6),
        newPassword: zod_1.z.string().min(6),
    }),
});
//# sourceMappingURL=auth.validation.js.map