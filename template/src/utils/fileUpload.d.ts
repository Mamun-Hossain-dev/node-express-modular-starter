import multer from 'multer';
export declare const fileUploader: {
    upload: multer.Multer;
    uploadToCloudinary: (file: Express.Multer.File) => Promise<{
        url: string;
        publicId: string;
    }>;
    deleteFromCloudinary: (publicId: string, resourceType?: "image" | "video" | "raw") => Promise<void>;
};
