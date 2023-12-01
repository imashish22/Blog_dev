const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String,
        requried:true,
    },
    author:{
        type:String,
        requried:true,
    },
    postId:{
        type:String,
        requried:true,
    },
    userId:{
        type:String,
        requried:true,
    },
},{timestamps:true})


module.exports = mongoose.model("Comment",CommentSchema)

