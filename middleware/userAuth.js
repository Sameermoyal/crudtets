const userModel=require('../Model/Model')
const secretKey ='ghvgh vyvygvvuu vyjbvbbbvjgjfvchg'
const jwt =require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try{
        const token=req.headers?.authorization;
        console.log(">>>>token>>>",token)
        if(! token){
            return  res.status(401).json({message:'No token Provided'});
        }
        const splitToken = token.split(" ")[1]
        console.log(">>>>>>>splitToken>>>>>",splitToken);


        const decode =jwt.verify(splitToken,secretKey)
        console.log('>>>>decode>>>>',decode)
  
        if(!decode){
            return  res.status(401).json({message:'No Decode'});
        }
     const user=await userModel.findById(decode.id);
        if(!user){
            return res.status(401).json({message:'User NOt found'})
        }
    next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
    
}
