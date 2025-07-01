const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      }
    });

module.exports=transporter;