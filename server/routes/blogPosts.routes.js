import express from "express"
// const express=require("express")
import { authentication,loginPage,getAllBlogPosts,addBlogPost,getSinglePost,removeSingleBlogPost,likeBlogPost,updateSingleBlogPost } from "../controllers/blogPosts.controller.js";
// const { getAllBlogPosts,addBlogPost,getSinglePost,removeSingleBlogPost,likeBlogPost,updateSingleBlogPost } = require("../controllers/blogPosts.controller");
const route=express.Router()

route.get("/test",(req,res,next)=>{
    res.send("hey there, this  is a test!");
    next();
})
route.get("/",getAllBlogPosts);
route.get("/login",loginPage);
route.post("/auth",authentication);
route.post("/",addBlogPost);
route.get("/:id",getSinglePost);
route.post("/update/:id",updateSingleBlogPost);
route.post("/delete/:id",removeSingleBlogPost);
route.patch("/:id/likedBlogPost",likeBlogPost);

export default route;