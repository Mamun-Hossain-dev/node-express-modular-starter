import { LoginPayloadInput, RegisterPayloadInput } from './auth.interface';
export declare const authService: {
    registerUser: (payload: RegisterPayloadInput) => Promise<import("mongoose").Document<unknown, {}, import("../user/user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../user/user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    loginUser: (payload: LoginPayloadInput) => Promise<{
        user: {
            firstName: string;
            lastName?: string;
            email: string;
            role?: "admin" | "user" | "guest";
            profileImage?: string;
            bio?: string;
            otpExpiry?: Date;
            phone?: string;
            location?: string;
            otp?: string;
            verified?: boolean;
            isSubscribed?: boolean;
            subscription?: import("mongoose").Types.ObjectId;
            profileImagePublicId?: string;
            subscriptionExpiry?: Date | null;
            isPasswordMatched(givenPassword: string): Promise<boolean>;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    forgotPassword: (email: string) => Promise<{
        message: string;
    }>;
    verifyEmail: (email: string, otp: string) => Promise<{
        message: string;
    }>;
    resetPassword: (email: string, newPassword: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            firstName: string;
            lastName?: string;
            email: string;
            role?: "admin" | "user" | "guest";
            profileImage?: string;
            bio?: string;
            otpExpiry?: Date;
            phone?: string;
            location?: string;
            otp?: string;
            verified?: boolean;
            isSubscribed?: boolean;
            subscription?: import("mongoose").Types.ObjectId;
            profileImagePublicId?: string;
            subscriptionExpiry?: Date | null;
            isPasswordMatched(givenPassword: string): Promise<boolean>;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        };
    }>;
    changePassword: (userId: string, oldPassword: string, newPassword: string) => Promise<{
        message: string;
    }>;
};
