const cloudinary  = require('cloudinary').v2
require('dotenv').config()

cloudinary.config(
   {
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
   }
)

exports.uploadFile=async(file)=>{
      const fileArray = Object.values(file)
      const results=[]
      
      for(const file of fileArray){
         try{
            const result =await new Promise((res,rej)=>{
               cloudinary.uploader.upload_stream((error,result)=>{
                  if(error){
                     rej(error)
                  }
                  res(result)
               }).end(file.data)
            })
            results.push(result)

         }catch(error){
            console.error('error uploading in cloudinary',error)
         }

      }
      return results
   
}

