

const express= require('express')

const mongoose = require("mongoose");

const cors = require("cors");
const blogroute = require('./routes/blog.route');

require("dotenv").config();
const app = express();
// const blogroute = require("./routes/blogs.route");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/blogs", blogroute);


mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Database is connected");
  });
  app.get("/", (req, res) => {
    res.send("App is Working.");
  });
  
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
  
