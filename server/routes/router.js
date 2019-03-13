const router = require('express').Router(),
    userController = require('../controller/articleController'),
    axios = require('axios')


router.get('/article/all', userController.all)
router.post('/article/add', userController.add)
router.put('/article/edit/:id', userController.edit)
router.delete('/article/delete/:id', userController.remove)






module.exports = router