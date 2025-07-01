const Url= require('../models/Url');

async function saveUrl(shortId,originalUrl){
    const newUrl= new Url({shortUrl:shortId,originalUrl:originalUrl});
    return await newUrl.save();
}

async function getUrlByShortId(shortId){
    return await Url.findOne({shortUrl:shortId});
}

async function incrementCount(urlDoc){
    urlDoc.clickCount++;
    return await urlDoc.save();
}


module.exports={saveUrl,getUrlByShortId,incrementCount};