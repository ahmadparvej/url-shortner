const mongoose = require("mongoose")
const shortid = require("shortid")

const UrlSchema = new mongoose.Schema({
    full:{type:String,required:true},
    short:{type:String,required:true,default:shortid.generate}
})
const UrlModel = mongoose.model("url",UrlSchema)

module.exports = UrlModel