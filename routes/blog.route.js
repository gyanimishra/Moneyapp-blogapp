const blogroute = require("express").Router();
const Blog = require("../models/Blog");
require("dotenv").config();


// get all blogs from api  /////
async function getAllblogs() {
    try {
      let Allblogs = await Blog.find();
      return { Allblogs, status: "Success" };
    } 
    catch (error) {
      return { message: "Internal server error Please Try again", status: "Error" };
    }
  }
  
  blogroute.get("/", async (req, res) => {
    // console.log("hhgahg")
    let Allblogs = await getAllblogs();
    if (Allblogs.status === "Error") {
        return res.status(500).json("message",Allblogs.message);
    }
    else{
        return res.status(200).json(Allblogs.Allblogs);
    }
    
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////


  // get blog by id or individual single blog ////
async function getBlog(blogid) {
    try {
      let Singleblog = await Blog.findOne({ _id: blogid });
      return { Singleblog, status: "Success" };
    } catch (error) {
      return { message: "Internal server error Please Try again ", status: "Error" };
    }
  }



  blogroute.get("/:blogid", async (req, res) => {
    let Singleblog = await getBlog(req.params.blogid);
    if (Singleblog.status === "Error") return res.status(500).json("message",Singleblog.message);
    return res.status(200).json(Singleblog.Singleblog);
  });

  ////////////////////////////////////////////////////////////////////////



  // creating  a blog///////////////////////////////////////

async function createBlog(req,res) {
    if (!req.body.title)
      return { message: "Please fill the appropriate Title.", status: "Error" };
    if (!req.body.body)
      return { message: "Please fill the appropriate Title", status: "Error" };
   
    try {
      await Blog.create({ ...req.body, userid: req.id });
      return {
        message: "Blog created successfully.",
        status: "Success",
      };
    } catch (error) {
      return { message: "Internal server error", status: "Error" };
    }
  }
  

  blogroute.post("/create", async (req, res) => {
    let blog = await createBlog(req);
    if (blog.status === "Error") 
    {
        return res.status(500).json("message",blog.message);
    }
    else{
        return res.status(201).json(blog.message);
    }
    
  });




  ////////Delete Blog

  async function Deleteblog(request) {
  try {
      let blog = await Blog.findOne({ _id: request.params.blogid });
      
        await blog.deleteOne();
        return {
          message: "Blog  deleted successfully.",
          status: "Success",
        };
          
    } catch (error) {
      return { error: "Internal server error" ,status:"Error"};
    }
  }




  blogroute.delete("/:blogId/delete", async (req, res) => {
    let blog = await Deleteblog(req);
    if (blog.status === "error") 
    {return res.status(401).json(blog.message)}

    else{
        return res.status(204).json(blog.message);
    }
    
  });









///////Update blog//////////////////////////////////////

  async function updateBlog(req,res) {
    try {
      let blog = await Blog.findOne({ _id: req.params.blogid });
       
        await blog.updateOne({ $set: req.body });
        return {
          message: "Blog  updated successfully.",
          status: "Success",
        };
      
      
    } catch (error) {
      return { message: "Internal server error", status: "Error" };
    }
  }
  



  blogroute.patch("/:blogid/update", async (req, res) => {
    let blog = await updateBlog(req);
    if (blog.status === "Error") 
    {return res.status(401).json(blog.message);}
    else{
        return res.status(200).json(blog.message);
    }
   
  });

  module.exports = blogroute;