import route from "./routes/blogPosts.routes.js"
import express from "express"
import session from "express-session"
// const express=require("express")
// const cors=require("cors")
// const bodyParser=require("body-parser")
// const mongoose=require("mongoose")
// const dotenv=require("dotenv")
// const blogPosts=require("./routes/blogPosts.routes")
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

dotenv.config()

const app=express()
app.set('view engine','ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json({limit:'50mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(cors())

app.use('/api/blogs',route)

const DB_CONNECTION=process.env.DB_URL
const port=process.env.PORT||6000

const uri=process.env.DB_URL;
mongoose.connect(uri,{useNewURLParser:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB Database connection successfull');
});

// mongoose.connect(DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>app.listen(PORT,()=>{
//     console.log(`DB connected, app running at http://localhost:${PORT}`)
// })).catch((error)=>console.error());

app.listen(port,()=>{
    console.log(`App running on port ${port} at timestamp ${Date.now()}`);
});