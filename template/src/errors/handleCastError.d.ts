import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error.interface';
declare const handleCastError: (error: mongoose.Error.CastError) => TGenericErrorResponse;
export default handleCastError;
