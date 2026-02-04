import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | null;
        }
    }
}
declare const auth: (...requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default auth;
