const express =require('express')
const router =express.Router()
const userController =require('../Controller/Controller')

router.get('/get',userController.getAllUser)
router.post('/post',userController.createUSer)
router.delete('/delete/:id',userController.userDelete)
 router.patch('/patch',userController.updateUser)

module.exports =router;

