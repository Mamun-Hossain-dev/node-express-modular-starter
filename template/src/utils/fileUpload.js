"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const streamifier_1 = __importDefault(require("streamifier"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary.cloudName,
    api_key: config_1.default.cloudinary.apiKey,
    api_secret: config_1.default.cloudinary.apiSecret,
});
const sanitizeFileName = (fileName) => {
    return fileName
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9._-]/g, '')
        .toLowerCase();
};
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|mkv|csv/;
        const ext = node_path_1.default.extname(file.originalname).toLowerCase();
        if (!allowedTypes.test(ext)) {
            return cb(new AppError_1.default(400, 'Only images, videos, or CSV files are allowed'));
        }
        cb(null, true);
    },
});
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return reject(new AppError_1.default(400, 'No file provided for upload'));
        }
        const ext = node_path_1.default.extname(file.originalname).toLowerCase();
        const isVideo = ['.mp4', '.mov', '.avi', '.mkv'].includes(ext);
        const isCSV = ext === '.csv';
        const safeFileName = `${Date.now()}-${sanitizeFileName(file.originalname)}`;
        let resourceType = 'image';
        if (isVideo)
            resourceType = 'video';
        else if (isCSV)
            resourceType = 'raw';
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: `NodeExpressStarter/${resourceType}s`,
            resource_type: resourceType,
            public_id: safeFileName,
            ...(isVideo || isCSV
                ? {}
                : {
                    transformation: {
                        width: 500,
                        height: 500,
                        crop: 'limit',
                    },
                }),
        }, (error, result) => {
            if (error || !result) {
                return reject(new AppError_1.default(500, 'Cloudinary upload failed'));
            }
            resolve({
                url: result.secure_url,
                publicId: result.public_id,
            });
        });
        streamifier_1.default.createReadStream(file.buffer).pipe(stream);
    });
};
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    if (!publicId)
        return;
    try {
        await cloudinary_1.v2.uploader.destroy(publicId, { resource_type: resourceType });
    }
    catch {
        throw new AppError_1.default(500, 'Failed to delete file from Cloudinary');
    }
};
exports.fileUploader = {
    upload,
    uploadToCloudinary,
    deleteFromCloudinary,
};
//# sourceMappingURL=fileUpload.js.map