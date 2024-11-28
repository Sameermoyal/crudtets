const { get } = require('mongoose')
const userModel =require('../Model/Model')
const bcrypt =require('bcrypt')
const secretKey ='ghvgh vyvygvvuu vyjbvbbbvjgjfvchg'
const jwt =require('jsonwebtoken')
const {uploadFile} =require('../utility/cloudinaryService')
const moment = require('moment'); 


const generateOtp=async()=>{
   const num= Math.random()
 return  Math.floor(num*1000000).toString();
}

exports.createUSer=async(req,res)=>{
    const data= req.body;
      console.log("req.body>>>>>",req.body)
    const fileUpload =await uploadFile(req.files) 
    console.log('>>>>filesUpload>>',fileUpload[0].url)
    const randomOtp =await generateOtp();
    console.log('>>>>>>>>>randomOtp>>',randomOtp)
   
    const{name,email,password}=req.body;
     console.log(">>>>>>>>>>>>>>name>>",name,email)
     if (!name || !email || !password) {
         return res.status(400).json({ message: "All fields are required." });
       }
 
     const userEmail=await userModel.findOne({email})
     if(userEmail){
         res.status(200).json({message:"email alresdy register"})
     }
     const salt=bcrypt.genSaltSync(10);
     const hash=bcrypt.hashSync(password,salt)
     const udata={
         name,
         email,
         password:hash,
         aadhar:fileUpload[0].url,
         otp:randomOtp
     };
     const userData= new userModel(udata);
     await userData.save();
     
 
     res.status(200).json({message:"user created successfully"})
 }

exports.getAllUser=async(req,res)=>{
    const userData =await userModel.find()
    res.status(200).json(userData)

}
exports.getOneUser=async(req,res)=>{
    const id=req.params.id;
    console.log(">>>>>req.params",req.params)
    const userData =await userModel.findById(id)
    if (!userData) {
        return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json(userData);


}



exports.userLogin =async(req,res)=>{
    try{
     const{email,password,otp}=req.body;
    
     console.log("<<<<email",email)
     const userDetail =await userModel.findOne({email})
     console.log(">>>>>>>userDetails>>>",userDetail)
     if(!userDetail){
        return res.status(400).json({message:"please sign up this email not registerd"});
     }
     const signupTime = userDetail.signupTime;
     const currentTime = new Date();
     const timeDiff = (currentTime - signupTime) / (1000 * 60); 

     if (timeDiff > 1) {
         return res.status(401).json({ message: "Login expired. Please sign up again." });
     }

     const dataBasePassword =await userDetail.password;
     const match=await bcrypt.compare(password,dataBasePassword)
     

     if(!match){
         return    res.status(400).json({message:"invalid Password "})
         }

    const userOTP = userDetail.otp 
       
    if(userOTP!=otp){
        return res.status(401).json({message:" invalid otp"})
    }

    console.log(">>>>>userOTP ",userOTP," otp ",otp)
    

    
        const token=jwt.sign({id:userDetail._id},secretKey,
             {expiresIn:"1m"}
         ) 
        
        // await userModel.findOneAndUpdate(userDetail._id,{otp:null})
        await userModel.updateOne({ _id: userDetail._id }, { $unset: { otp: 1 } });        
     res.status(200).json({message:"successfully login  ",token});
    }catch(err){
     res.status(500).json({message:"internal server error  "});
    }
 }

exports.userDelete=async(req,res)=>{
    const{id}=req.params;
    console.log(">>>>>>>>>>>>>>id>>",id)
    const userEmail=await userModel.findOneAndDelete({_id:id})
    if(! userEmail){
        res.status(200).json({message:"user not exist"})
    }
   
    res.status(200).json(userEmail)
}
exports.updateUser=async(req,res)=>{
    const{id}=req.body;
    const data =req.body;
    console.log(">>>>>>>>>>>>>>id>>",data)
    const userEmail=await userModel.findOneAndUpdate({id,data})

    res.status(200).json(userEmail)
}