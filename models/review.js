const mongoose = require("mongoose");




const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,required: true,
    },
    description: {
      type: String, required: true,
    },
    
  },
  { timestamps: true }
);





module.exports = mongoose.model("reviews", reviewSchema);