"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fileUpload_1 = require("../../utils/fileUpload");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const user_model_1 = require("./user.model");
const createUser = async (payload) => {
    const user = await new user_model_1.User(payload);
    return user.save();
};
const getUserById = async (id) => {
    const user = await user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    return user;
};
const getAllUsers = async (filterOptions, paginationOptions) => {
    // filtering
    const { searchTerm, ...filterData } = filterOptions;
    // pagination
    const { page, limit, skip, sortBy, sortOrder } = (0, pagination_1.default)(paginationOptions);
    const andCondition = [];
    const searchFields = ['firstName', 'lastName', 'email', 'role'];
    if (searchTerm) {
        andCondition.push({
            $or: searchFields.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    if (Object.keys(filterData).length) {
        andCondition.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereCondition = andCondition.length ? { $and: andCondition } : {};
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }
    const [users, total] = await Promise.all([
        user_model_1.User.find(whereCondition)
            .skip(skip)
            .limit(limit)
            .sort(sortCondition),
        user_model_1.User.countDocuments(whereCondition),
    ]);
    if (users.length === 0) {
        throw new AppError_1.default(404, 'No users found');
    }
    return {
        data: users,
        meta: {
            total,
            page,
            limit,
        },
    };
};
const updateUserById = async (id, updateData, file) => {
    const existingUser = await user_model_1.User.findById(id).select('profileImage profileImagePublicId');
    if (!existingUser) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (file) {
        const uploadedImage = await fileUpload_1.fileUploader.uploadToCloudinary(file);
        if (!uploadedImage?.url) {
            throw new AppError_1.default(500, 'Image upload failed');
        }
        updateData.profileImage = uploadedImage.url;
        updateData.profileImagePublicId = uploadedImage.publicId;
        // Delete old image from Cloudinary
        if (existingUser.profileImagePublicId) {
            await fileUpload_1.fileUploader.deleteFromCloudinary(existingUser.profileImagePublicId);
        }
    }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
};
const deleteUserById = async (id) => {
    const user = await user_model_1.User.findById(id);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    return await user.deleteOne();
};
exports.userService = {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById,
};
//# sourceMappingURL=user.service.js.map