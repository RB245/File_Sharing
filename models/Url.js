const mongoose= require("mongoose");

const urlSchema = new mongoose.Schema({
    shortUrl:{
        type:String,
        unique:true
    },
    originalUrl:String,
    createdAt:{
        type:Date,
        default: Date.now()
    },
    clickCount:{
        type:Number,
        default:0
    }
});

module.exports= mongoose.model('Url',urlSchema);