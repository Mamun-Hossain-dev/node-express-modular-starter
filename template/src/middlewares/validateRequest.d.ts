import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default validateRequest;
