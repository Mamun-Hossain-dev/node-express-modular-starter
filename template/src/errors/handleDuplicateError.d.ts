import { TGenericErrorResponse } from '../interface/error.interface';
declare const handleDuplicateError: (err: {
    message: string;
}) => TGenericErrorResponse;
export default handleDuplicateError;
