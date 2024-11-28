const express =require('express')
const router =express.Router()
const userController =require('../Controller/Controller')
const userAuth =require('../middleware/userAuth')

router.get('/get',userAuth,userController.getAllUser)
router.post('/post',userAuth,userController.createUSer)
router.delete('/delete/:id',userController.userDelete)
router.get('/getOne/:id',userAuth, userController.getOneUser)
 router.patch('/patch',userController.updateUser)
 router.post('/login',userAuth,userController.userLogin)

module.exports =router;

