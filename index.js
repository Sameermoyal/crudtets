const express =require('express')
const mongoose =require('mongoose')
const cors=require('cors')
require('dotenv').config()
const router =require('./Route/Route')
const fileUpload =require('express-fileupload')

const app=express()
app.use(cors())
app.use(fileUpload())

// const uschema =mongoose.Schema({})
// const userModel=mongoose.model('user',uschema)

const port=process.env.PORT ||4000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/abc',router);

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("mogodb connected"))
.catch((err)=>console.log(">>>>>>errrrrrrrrrr>>>>",err))
app.listen(port,()=>{
    console.log("server run successfullly this port",port)
})