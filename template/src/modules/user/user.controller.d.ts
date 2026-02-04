import { Request, Response } from 'express';
export declare const userController: {
    createUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getUserById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteUserById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateUserById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
