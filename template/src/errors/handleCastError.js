"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errorSources = [
        {
            path: error.path,
            message: `Invalid ${error.path}: ${error.value}`,
        },
    ];
    const statusCode = 400;
    const message = 'Cast error occurred';
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleCastError;
//# sourceMappingURL=handleCastError.js.map