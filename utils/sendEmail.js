const nodemailer = require('nodemailer');

const sendEmail = async (options, template) => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const message = {
        from: `"${options.senderName?options.senderName: "Urban Fits"}" <${options.from?options.from:process.env.SMTP_SENDER_EMAIL}>`,
        to: options.to,
        replyTo: options.from?options.from:process.env.SMTP_SENDER_EMAIL,
        text: "Urban Fits",
        subject: options.subject,
        html: template
    };

    let info = await transport.sendMail(message);
    console.log(info)
    return info
}
export default sendEmail