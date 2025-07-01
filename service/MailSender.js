const nodemailer = require("nodemailer");
const transporter = require("../configs/Mailer");

const sendMail = async({emailTo, emailFrom, link, fileName})=>{
    await transporter.sendMail({
        from:emailFrom,
        to:emailTo,
        subject:"Your file is ready to download!",
        html:`<strong style="color:blue; font-size:100px">Hi this is automated mail from this: ${link}</strong>`
    }, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log(`Email sent successfully to: ${emailTo}`);
      }
    })
}

module.exports=sendMail;