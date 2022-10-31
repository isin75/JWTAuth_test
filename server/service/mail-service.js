const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }
    async sendActivationMail(userEmail, activationLink) {
        await this.transporter.sendMail({
            form: process.env.SMTP_USER,
            to: userEmail,
            subject: 'Activate your account in Coffee Hunt',
            text: '',
            html:
                    `
                    <div>
                        <h1>To activate your profile follow the link</h1>
                        <a href="${activationLink}">
                            <button>Activate your Coffee Hunt!</button>
                        </a>
                    </div>
                    `
        })
    }

}


module.exports = new MailService()