import { CreateUserInput, UserFilterOptions, UserPaginationOptions } from './user.interface';
export declare const userService: {
    createUser: (payload: Partial<CreateUserInput>) => Promise<import("mongoose").Document<unknown, {}, import("./user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getUserById: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllUsers: (filterOptions: UserFilterOptions, paginationOptions: UserPaginationOptions) => Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.interface").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
        };
    }>;
    updateUserById: (id: string, updateData: Partial<CreateUserInput>, file?: Express.Multer.File) => Promise<(import("mongoose").Document<unknown, {}, import("./user.interface").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.interface").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteUserById: (id: string) => Promise<import("mongodb").DeleteResult>;
};
