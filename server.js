const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./configs/mongodbConnection.js");
const app = express();
const path = require("path");
const port = process.env.PORT || 8081;
const sendMail = require("./service/MailSender");
const fileUploadRoute = require('./routes/fileUploadRoute.js');
const ExpiryCron = require('./service/cronJob.js');
const File = require("./models/File");
const cors = require("cors");
//connect to MongoDB
connectDB();
ExpiryCron();

//Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use('/', fileUploadRoute);

app.get("/", (req, res) =>{
    res.send("Welcome to file sharing app...");
});

let emailOptions={
    emailTo:"rachnabajoria24@gmail.com",
    emailFrom:"rachnabajoria04@gmail.com",
    link:"abcd", fileName:"abdd", size:1233
}
//Start server
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});

app.get('/:shortId', async (req, res) => {
    try {
        const file = await File.findOne({ shortId: req.params.shortId });
        if (!file || file.isExpired) {
            return res.status(404).send("This file has expired or does not exist.");
        }
        res.redirect(file.cloudinaryUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong.");
    }
});

