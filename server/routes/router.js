const router = require('express').Router(),
    userController = require('../controller/userController'),
    articleController = require('../controller/articleController'),
    axios = require('axios'),
    images = require('../helper/images'),
    multer = require('multer')

router.get('/article/all', articleController.all)
router.post('/article/create', articleController.add)
router.patch('/article/edit/:id', articleController.edit)
router.delete('/article/delete/:id', articleController.remove)
router.get('/article/one', articleController.one)
router.post('/article/get', articleController.getOne)
router.post('/article/addArticle', articleController.addArticle)
// router.post('/article/uploud', articleController.unggah)
router.post('/article/uploud', images.multer.single('featured_image'), images.sendUploadToGCS, articleController.unggah)
// articleController.unggah)

router.get('/user/all', userController.all)
router.post('/user/create', userController.create)
router.put('/user/edit/:id', userController.edit)
router.delete('/user/delete/:id', userController.remove)
router.post('/user/login', userController.login)






module.exports = router