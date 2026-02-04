export declare const hashOtp: (otp: string) => Promise<string>;
export declare const compareOtp: (otp: string, hashedOtp: string) => Promise<boolean>;
