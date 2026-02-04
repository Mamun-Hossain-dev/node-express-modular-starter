import { z } from 'zod';
export declare const RegisterUserZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        role: z.ZodOptional<z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            admin: "admin";
            user: "user";
            guest: "guest";
        }>>>>;
        firstName: z.ZodString;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        password: z.ZodString;
        profileImage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const LoginUserZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodNonOptional<z.ZodString>;
        password: z.ZodNonOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ForgotPasswordZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodNonOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const VerifyEmailZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodNonOptional<z.ZodString>;
        otp: z.ZodNonOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ResetPasswordZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        newPassword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const ChangePasswordZodSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        oldPassword: z.ZodString;
        newPassword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
