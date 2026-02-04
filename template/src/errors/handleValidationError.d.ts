import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error.interface';
declare const handleValidationError: (err: mongoose.Error.ValidationError) => TGenericErrorResponse;
export default handleValidationError;
