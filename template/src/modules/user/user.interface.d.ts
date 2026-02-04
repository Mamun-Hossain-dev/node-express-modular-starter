import { HydratedDocument, Types } from 'mongoose';
import z from 'zod';
import { createUserZodSchema, getAllUsersZodSchema } from './user.validation';
export interface IUser {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    role?: 'admin' | 'user' | 'guest';
    profileImage?: string;
    bio?: string;
    otpExpiry?: Date;
    phone?: string;
    location?: string;
    otp?: string;
    verified?: boolean;
    isSubscribed?: boolean;
    subscription?: Types.ObjectId;
    profileImagePublicId?: string;
    subscriptionExpiry?: Date | null;
    isPasswordMatched(givenPassword: string): Promise<boolean>;
}
export interface IUserModel {
    findByEmail(email: string): Promise<HydratedDocument<IUser> | null>;
}
export type CreateUserInput = z.infer<typeof createUserZodSchema>['body'];
export type GetAllUsersInput = z.infer<typeof getAllUsersZodSchema>['query'];
export type UserFilterOptions = Pick<GetAllUsersInput, 'searchTerm' | 'firstName' | 'lastName' | 'email' | 'role'>;
export type UserPaginationOptions = Pick<GetAllUsersInput, 'page' | 'limit' | 'sortBy' | 'sortOrder'>;
