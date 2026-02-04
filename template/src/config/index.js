"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.coerce.number().default(5000),
    MONGO_URI: zod_1.z.string().min(1, 'Mongo URI is required'),
    CLIENT_URL: zod_1.z.string().default('http://localhost:3000'),
    BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number().default(10),
    ACCESS_TOKEN_SECRET: zod_1.z.string().min(1, 'Access token secret is required'),
    REFRESH_TOKEN_SECRET: zod_1.z.string().min(1, 'Refresh token secret is required'),
    ACCESS_TOKEN_EXPIRES_IN: zod_1.z.string().default('1d'),
    REFRESH_TOKEN_EXPIRES_IN: zod_1.z.string().default('365d'),
    EMAIL_FROM: zod_1.z.string().email().optional(),
    EMAIL_USER: zod_1.z.string().optional(),
    EMAIL_PASS: zod_1.z.string().optional(),
    EMAIL_PORT: zod_1.z.coerce.number().optional(),
    EMAIL_HOST: zod_1.z.string().optional(),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().optional(),
    CLOUDINARY_API_KEY: zod_1.z.string().optional(),
    CLOUDINARY_API_SECRET: zod_1.z.string().optional(),
    RATE_LIMIT_WINDOW: zod_1.z.coerce.number().default(900000), // 15 minutes
    RATE_LIMIT_MAX: zod_1.z.coerce.number().default(100),
    COOKIE_SECRET: zod_1.z.string().optional(),
});
const parseEnv = envSchema.safeParse(process.env);
if (!parseEnv.success) {
    console.error('Invalid environment variables:', JSON.stringify(parseEnv.error.format(), null, 4));
    process.exit(1);
}
const envVars = parseEnv.data;
exports.default = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoUri: envVars.MONGO_URI,
    clientUrl: envVars.CLIENT_URL,
    bcryptSaltRounds: envVars.BCRYPT_SALT_ROUNDS,
    jwt: {
        accessSecret: envVars.ACCESS_TOKEN_SECRET,
        refreshSecret: envVars.REFRESH_TOKEN_SECRET,
        accessExpiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
        refreshExpiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
    },
    email: {
        from: envVars.EMAIL_FROM,
        user: envVars.EMAIL_USER,
        pass: envVars.EMAIL_PASS,
        port: envVars.EMAIL_PORT,
        host: envVars.EMAIL_HOST,
    },
    cloudinary: {
        cloudName: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET,
    },
    rateLimit: {
        window: envVars.RATE_LIMIT_WINDOW,
        max: envVars.RATE_LIMIT_MAX,
    },
    cookieSecret: envVars.COOKIE_SECRET,
};
//# sourceMappingURL=index.js.map