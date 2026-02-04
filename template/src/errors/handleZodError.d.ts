import { ZodError } from 'zod';
import { TGenericErrorResponse } from '../interface/error.interface';
declare const handleZodError: (err: ZodError) => TGenericErrorResponse;
export default handleZodError;
