// const nodemailer = require("nodemailer");
// const transporter = require("../configs/Mailer");

// const sendMail = async({emailTo, emailFrom, link, fileName})=>{
//     await transporter.sendMail({
//         from:emailFrom,
//         to:emailTo,
//         subject:"Your file is ready to download!",
//         html:`<strong style="color:blue; font-size:100px">Hi this is automated mail from this: ${link}</strong>`
//     }, function(err, data) {
//       if (err) {
//         console.log("Error " + err);
//       } else {
//         console.log(`Email sent successfully to: ${emailTo}`);
//       }
//     })
// }

// module.exports=sendMail;


const nodemailer = require("nodemailer");
const transporter = require("../configs/Mailer");

const sendMail = async({ emailTo, emailFrom, link, fileName }) => {
    await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        subject: "Your file is ready to download!",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Your file is ready to download 📄</h2>
                <p><strong>File Name:</strong> ${fileName}</p>
                <p>
                    <a href="${link}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; 
                              text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Download File
                    </a>
                </p>
                <p>If the button doesn't work, click or copy this link:</p>
                <p><a href="${link}" style="color: #3366cc;">${link}</a></p>
                <br>
                <p>⚠️ This file will expire soon. Download it before the expiry date.</p>
            </div>
        `
    }, function(err, data) {
        if (err) {
            console.log("❌ Email error: " + err);
        } else {
            console.log(`✅ Email sent successfully to: ${emailTo}`);
        }
    });
}

module.exports = sendMail;
