import { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
type ExpiresIn = SignOptions['expiresIn'];
export declare const jwtHelper: {
    generateToken: (payload: string | object | Buffer, secretKey: Secret, expiresIn: ExpiresIn) => string;
    verifyToken: (token: string, secretKey: Secret) => JwtPayload;
};
export {};
