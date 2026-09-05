

const mongoose = require("mongoose")

const urlSchema =new mongoose.Schema({

    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
         type:String,
        required:true,
    },
    visitHistory:[ {timestamp: {type:Number} }],
    createdBy:{
        ref:"User",
        type: mongoose.Schema.Types.ObjectId

    }
   

},{timestamps:true}) 


// model
const Url = mongoose.model("url",urlSchema)

module.exports = {
    Url,
}