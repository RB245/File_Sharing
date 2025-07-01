function validate(req,res){
    const {url}=req.body;

    if(url==null || url==''){
        res.status(400).send("Body cannot be null");
    }

}

module.exports=validate;