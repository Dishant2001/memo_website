import mongoose from "mongoose"

const blogSchema=mongoose.Schema({
    title:String,
    description:String,
    tags:String,
    createdAt:{
        type:Date,
        default:new Date(),
    },
});

var BlogPost=mongoose.model("BlogArticle",blogSchema);

export default BlogPost;
