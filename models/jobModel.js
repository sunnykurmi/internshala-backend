const mongoose = require("mongoose");


const jobmodel = new mongoose.Schema(
  {
    students: [{
      type:mongoose.Schema.Types.ObjectId,ref:"student"
  }],
    employe: {
      type:mongoose.Schema.Types.ObjectId,ref:"employe"
  },
    jobtitle:String,
    skills:String,
    jobtype: {
        type:String,
        enum:["In office","Remote"]
    },
    openings:Number,
    description:String,
    prefrences:String,
    salary:Number,
    perks:String,
    assesments:String,
  });
  
const job = mongoose.model("job", jobmodel);
module.exports = job;
