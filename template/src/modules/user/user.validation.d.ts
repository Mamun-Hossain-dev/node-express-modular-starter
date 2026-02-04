import z from 'zod';
export declare const userBaseSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        admin: "admin";
        user: "user";
        guest: "guest";
    }>>>;
    profileImage: z.ZodOptional<z.ZodString>;
    profileImagePublicId: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    otp: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createUserZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            admin: "admin";
            user: "user";
            guest: "guest";
        }>>>;
        profileImage: z.ZodOptional<z.ZodString>;
        profileImagePublicId: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        otp: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateUserZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        profileImage: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        location: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getUserParamZodSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllUsersZodSchema: z.ZodObject<{
    query: z.ZodObject<{
        searchTerm: z.ZodOptional<z.ZodString>;
        firstName: z.ZodOptional<z.ZodString>;
        lastName: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            admin: "admin";
            user: "user";
            guest: "guest";
        }>>>;
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        sortBy: z.ZodOptional<z.ZodEnum<{
            firstName: "firstName";
            lastName: "lastName";
            email: "email";
            createdAt: "createdAt";
            updatedAt: "updatedAt";
        }>>;
        sortOrder: z.ZodOptional<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateUserPasswordZodSchema: z.ZodObject<{
    body: z.ZodObject<{
        currentPassword: z.ZodString;
        newPassword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
