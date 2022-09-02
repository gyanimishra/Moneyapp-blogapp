const mongoose = require("mongoose");

// blog item are created according to given codtion in assiment//////


const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,required: true,
    },
    body: {
      type: String, required: true,
    },
    user_Id: {
      type: String,required: true,
    },
  },
  ////it is for time stamp//////
  { timestamps: true }
);





module.exports = mongoose.model("Blog", blogSchema);