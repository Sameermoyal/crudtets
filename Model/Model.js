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
        number:{
            type:String,
            required:true,
        },
        number:{
            type:String,
            required:true,
        },
       
        otp:{
            type:String,
            required:true,
        },
        aadhar:{
            type:String,
            required:true,
        },


    }
)

module.exports=mongoose.model('user',userSchema)