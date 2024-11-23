const { get } = require('mongoose')
const userModel =require('../Model/Model')

exports.getAllUser=async(req,res)=>{
    const userData =await userModel.find()
    res.status(200).json(userData)

}

exports.createUSer=async(req,res)=>{
    const{name,email}=req.body;
    console.log(">>>>>>>>>>>>>>name>>",name,email)
    const userEmail=userModel.findOne({email})
    if(userEmail){
        res.status(200).json({message:"email alresdy register"})
    }
    const userData= new userModel(req.body);
    await userData.save();
    res.status(200).json(userData)
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