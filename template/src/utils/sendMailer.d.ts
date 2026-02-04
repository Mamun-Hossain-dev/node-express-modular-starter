declare const sendMailer: (email: string, subject?: string, html?: string) => Promise<void>;
export default sendMailer;
