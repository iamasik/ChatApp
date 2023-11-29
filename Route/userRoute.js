const express=require('express')
const userControl=require('./../Controllers/userControl')
const authControl=require('../Controllers/authControl')

const user=express.Router()

const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `Public/images/`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload=multer({ storage: storage })

user.route('/addinfo').post(upload.single('image'),userControl.adduser)
user.route('/addinfo').post(userControl.adduser)
user.route('/login').post(authControl.login)


user.use(authControl.isAuthenticate)
user.route('/updateUser').patch(upload.single('image'),userControl.updateUser)
user.route('/deleteUser').delete(userControl.deleteUser)
user.route('/viewinfos').get(userControl.userinfos)
user.route('/SaveChat').post(userControl.SaveChat)
user.route('/viewUser/:id').get(userControl.user)
user.route('/logout').get(authControl.logOut) 


exports.user=user    