"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = __importDefault(require("./config"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// global middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: config_1.default.clientUrl, credentials: true }));
app.use((0, express_rate_limit_1.default)({
    windowMs: Number(config_1.default.rateLimit.window),
    max: Number(config_1.default.rateLimit.max),
}));
app.use(express_1.default.json({ limit: '25kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50kb' }));
app.use((0, cookie_parser_1.default)(config_1.default.cookieSecret));
// application routes(centralized router)
app.use('/api/v1', routes_1.default);
// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the API!',
    });
});
// not found error handler
app.use(notFound_1.default);
// global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map