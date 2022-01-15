import express, { request } from "express"
import session from "express-session"
import mongoose from "mongoose"
// import path from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
import __dirname from "../server.js"
import BlogPost from "../models/blogs.js"
import { json } from "body-parser"

var logged=false;


const route=express.Router()

export const authentication=async (req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    if(username==="dishant" && password==="1234"){
        req.session.loggedin=true;
        logged=true;
        res.redirect("/api/blogs");
    }
    else
        res.redirect('/api/blogs/login');
}

export const loginPage=async (req,res)=>{
    console.log(__dirname);
    if(logged){
        res.redirect('/api/blogs');
    }
    // var username=req.body.username;
    // var password=req.body.password;
    // if(username==="dishant" && password==="1234"){
    //     res.redirect('/api/blogs');
    // }
    // try{
    //     const blogPosts=await BlogPost.find();
    //     // res.status(200).json(blogPosts);
    //     // console.log(blogPosts[0]['title'])
    //     if(blogPosts.length!=0){
    //         for(var i=0;i<blogPosts.length;++i)
    //         console.log(String(blogPosts[i]['_id']))
    //     }
        // res.render(__dirname+'/index',{title:blogPosts[0]['title'],description:blogPosts[0]['description']})
    else  res.render(__dirname+'/login')
        // res.redirect('/api/blogs/login')
    
    // catch(error){
    //     res.status(404).json({message:error.message});
    // }
    // res.sendFile(__dirname+'/index.html');
    // res.sendFile('E:\\VSCode\\blogger\\server\\index.html')
}

export const getAllBlogPosts=async (req,res)=>{
    console.log(__dirname);
    if(logged){
            try{
                const blogPosts=await BlogPost.find();
                // res.status(200).json(blogPosts);
                // console.log(blogPosts[0]['title'])
                if(blogPosts.length!=0){
                    for(var i=0;i<blogPosts.length;++i)
                    console.log(String(blogPosts[i]['_id']))
                }
                // res.render(__dirname+'/index',{title:blogPosts[0]['title'],description:blogPosts[0]['description']})
                res.render(__dirname+'/index',{blogs:blogPosts})
            } catch(error){
                res.status(404).json({message:error.message});
            }
    }
    else{
        res.render(__dirname+'/login')
    }
    // res.sendFile(__dirname+'/index.html');
    // res.sendFile('E:\\VSCode\\blogger\\server\\index.html')
}

export const addBlogPost=async (req,res)=>{
    // const {title,description,tags}=req.params;
    // console.log(title);
    // console.log(description);
    // console.log(tags);
    var title=req.body.title;
    var description=req.body.notes;    
    var tags="empty";
    // var title="title"
    // var description="notes"
    // var tags="tag"
    const createNewPost= new BlogPost({
        title,
        description,
        tags,
    });

    try{
        // await createNewPost.save();
        await createNewPost.save();
        console.log("New note added")
        // res.render(__dirname+'/index',{blogs:blogPosts})
        res.redirect('/api/blogs/');
    }catch(error){
        res.status(409).json({message:error.message});
    }
};

export const getSinglePost=async (req,res)=>{
    const {id}=req.params;

    try{
        const singlePost=BlogPost.findById(id);
        res.status(200).json(singlePost);
    }catch(error){
        res.status(404).json({message:error.message});
    }
};

export const updateSingleBlogPost=async (req,res)=>{
    const {id}=req.params;
    var title=req.body.title;
    var description=req.body.notes;    
    var tags="empty";
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`post ${id} not found`);
    }

    const updatedBlogPost={
        title,
        description,
        tags,
        _id:id,
    }

    await BlogPost.findByIdAndUpdate(id,updatedBlogPost,{new:true});
    // res.json(updatedBlogPost);
    res.redirect('/api/blogs/')
};

export const removeSingleBlogPost = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`post ${id} not found`);
  
    await BlogPost.findByIdAndRemove(id);
  
    // res.json({ message: "Successfully deleted" });
    res.redirect('/api/blogs/');
  };


  export const likeBlogPost = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
  
    const post = await BlogPost.findById(id);
  
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      id,
      { upvote: post.upvote + 1 },
      { new: true }
    );
  
    res.json(updatedBlogPost);
  };


export default route