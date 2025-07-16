const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // ✅ Handle CORS preflight
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        return res.status(200).end();
    }

    // ✅ Set CORS headers for all other requests
    res.setHeader('Access-Control-Allow-Origin', '*');

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
