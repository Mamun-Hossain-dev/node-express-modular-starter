import { Model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
export declare const User: Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IUser> & IUserModel;
