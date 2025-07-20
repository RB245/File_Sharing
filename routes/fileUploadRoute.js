const File = require("../models/File.js")
const express = require('express');
const router = express.Router();
const multer = require("multer");
const cloudinary= require("../configs/CloudinaryConfig.js");
const fs = require("fs");
const { shortenUrl } = require("../service/urlService.js");
const sendMail = require("../service/MailSender.js");
const upload = multer({dest: 'uploads/'})

function getExpiryDate(duration){
    const now = new Date();
    const days = parseInt(duration);
    now.setDate(now.getDate() + days);
    return now;
}

router.post("/upload", upload.single('file'), async(req,res)=>{
    try{
        const {expiry, emailTo, emailFrom} = req.body;
        if(!req.file || !emailTo || !expiry){
            return res.status(400).json({error: 'Missing required fields (file, emailTo, expiry)'});
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type : 'raw',
            type: 'upload',
            access_mode: 'public'
        });
        // // const downloadableUrl = result.secure_url.replace('/upload/', `upload/fl_attachment:${req.file.originalname}/`);
        const encodedName = encodeURIComponent(req.file.originalname);
        const downloadableUrl = result.secure_url.replace(
        '/upload/',
        `/upload/fl_attachment:${encodedName}/`
        );
        fs.unlinkSync(req.file.path);

        const shortId = await shortenUrl(downloadableUrl);
        // const shortId = await shortenUrl(result.url);
        const expiryDate = getExpiryDate(expiry);

        const createdFile = await File.create({
            shortId,
            cloudinaryUrl:result.url,
            fileName: req.file.originalname,
            size: req.file.size,
            expiry: expiryDate
        });
        // const protocol = req.protocol === 'https' || process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const downloadLink = `${req.protocol}://${req.get("host")}/${shortId}`;

        await sendMail({
            emailTo,
            emailFrom: emailFrom || process.env.MAIL_USERNAME,
            link: downloadLink,
            fileName: req.file.originalname,
            size: req.file.size
        });
        // console.log("Body:", req.body);
        // console.log("File:", req.file);

        // const {expiry}=req.body;
        // if(!req.file) return res.status(400).json({error: 'No file uploaded'});
        // const result= await cloudinary.uploader.upload(req.file.path,{
        //     resource_type:'auto',
        // });
        // fs.unlinkSync(req.file.path);
        // // console.log(result);
        // const shortId = await shortenUrl(result.url);
        // // const expiry = getExpiryDate();
        // const createdFile = await File.create({
        //     shortId,
        //     cloudinaryUrl:result.url,
        //     fileName: req.file.originalname,
        //     size:req.file.size,
        //     expiry: new Date()
        // })

        res.json({createdFile});
        // return res.json({
        //     message: 'File uploaded successfully',
        //     url: result.secure_url,
        //     expiry
        // });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = router;