const { get } = require('mongoose')
const userModel =require('../Model/Model')
const bcrypt =require('bcrypt')
const secretKey ='ghvgh vyvygvvuu vyjbvbbbvjgjfvchg'
const jwt =require('jsonwebtoken')

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

exports.createUSer=async(req,res)=>{
    const{name,email,number}=req.body;
    console.log(">>>>>>>>>>>>>>name>>",name,email)
    if (!name || !email || !number) {
        return res.status(400).json({ message: "All fields are required." });
      }

    const userEmail=await userModel.findOne({email})
    if(userEmail){
        res.status(200).json({message:"email alresdy register"})
    }
    const salt=bcrypt.genSaltSync(10);
    const hash=bcrypt.hashSync(number,salt)
    const data={
        name,email,number:hash
    };
    const userData= new userModel(data);
    await userData.save();

    res.status(200).json({message:"user created successfully"})
}

exports.userLogin =async(req,res)=>{
    try{
     const{email,number}=req.body;
     const userDetail =await userModel.findOne({email})
     
     if(!userDetail){
        return res.status(400).json({message:"please sign up"});
     }
     const dataBasePassword =await userDetail.number;
     const match=await bcrypt.compare(number,dataBasePassword)
     
     if(!match){
         return    res.status(400).json({message:"invalid Password "})
         }
 
           
         const token=jwt.sign({id:userDetail._id},secretKey,
             // {expiresIn:1}
         )  
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