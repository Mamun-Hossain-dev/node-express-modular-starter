declare const _default: {
    env: "development" | "production" | "test";
    port: number;
    mongoUri: string;
    clientUrl: string;
    bcryptSaltRounds: number;
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    email: {
        from: string | undefined;
        user: string | undefined;
        pass: string | undefined;
        port: number | undefined;
        host: string | undefined;
    };
    cloudinary: {
        cloudName: string | undefined;
        apiKey: string | undefined;
        apiSecret: string | undefined;
    };
    rateLimit: {
        window: number;
        max: number;
    };
    cookieSecret: string | undefined;
};
export default _default;
