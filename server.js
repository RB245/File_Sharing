const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./configs/mongodbConnection.js");
const app = express();
const port = process.env.PORT || 8081;
const sendMail = require("./service/MailSender");
const fileUploadRoute = require('./routes/fileUploadRoute.js');

//connect to MongoDB
connectDB();


//Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', fileUploadRoute);

app.get("/", (req, res) =>{
    res.send("Welcome to file sharing app...");
});

let emailOptions={
    emailTo:"rachnabajoria24@gmail.com",
    emailFrom:"rachnabajoria04@gmail.com",
    link:"abcd", fileName:"abdd", size:1233
}

// app.get("/send", async (req, res)=>{
//     await sendMail(emailOptions);
// res.send("Mail sent successfully");
// })



// //404 handler
// app.use((req, res, next) =>{
//     res.status(404).json({
//         error:{
//             message: 'Route not found'
//         }
//     });
// });

// //Error handling middleware
// app.use((err, req, res, next) =>{
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//         error:{
//             message: err.message || 'Internal Server Error'
//         }
//     });
// });

//Start server
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});