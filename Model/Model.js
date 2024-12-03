const mongoose = require("mongoose");

const userSchema =mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        otp:{
            type:String,
            required:null,
        },
        
        aadhar:{
            type:String,
            required:false,
        },
        
        signupTime: { type: Date, default: Date.now },

    }
)

module.exports=mongoose.model('user',userSchema)