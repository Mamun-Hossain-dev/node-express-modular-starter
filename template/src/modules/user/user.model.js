"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        default: 'user',
    },
    profileImage: { type: String },
    profileImagePublicId: { type: String },
    bio: { type: String },
    phone: { type: String },
    location: { type: String },
    otp: { type: String },
    otpExpiry: { type: Date },
    verified: {
        type: Boolean,
        default: true,
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    subscription: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subscription',
    },
    subscriptionExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcryptjs_1.default.hash(this.password, Number(config_1.default.bcryptSaltRounds));
    }
});
userSchema.methods.isPasswordMatched = async function (givenPassword) {
    return await bcryptjs_1.default.compare(givenPassword, this.password);
};
// Static method to find user by email
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email }).select('+password');
};
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map