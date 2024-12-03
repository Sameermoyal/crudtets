const mongoose = require("mongoose");

const  loginSchema =new mongoose.Schema(
    {
       
        count:{
            type:Number,
            default:0,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        }
    },{versionKey:false,timestamps:true}
);

const loginModel=mongoose.model('login_detail',loginSchema)


module.exports=loginModel
