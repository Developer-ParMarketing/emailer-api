const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { code } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'info@parmarketing.agency',
            pass: 'yzqtpocumbafxgbt'
        }
    });

    const mailOptions = {
        from: 'info@parmarketing.agency',
        to: 'info@parmarketing.agency',
        subject: 'Code Challenge Submission',
        text: `Submitted Code:\n\n${code}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
}
