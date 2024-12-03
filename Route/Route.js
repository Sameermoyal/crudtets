const express =require('express')
const router =express.Router()
const userController =require('../Controller/Controller')
const userAuth =require('../middleware/userAuth')

router.get('/get',userController.getAllUser)
router.post('/post',userController.createUSer)
router.delete('/delete/:id',userController.userDelete)
router.get('/getOne/:id', userController.getOneUser)
 router.patch('/patch',userController.updateUser)
 router.post('/login',userAuth,userController.userLogin)
 router.post('/register',userController.createUser)
 router.post('/userLogin',userController.login)
module.exports =router;

