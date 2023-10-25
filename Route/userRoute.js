const express=require('express')
const userControl=require('./../Controllers/userControl')
const authControl=require('../Controllers/authControl')

const user=express.Router()

user.route('/addinfo').post(userControl.adduser)
user.route('/login').post(authControl.login)

user.use(authControl.isAuthenticate)
user.route('/updateUser/:id').patch(userControl.updateUser)
user.route('/deleteUser/:id').delete(userControl.deleteUser)
user.route('/viewinfos').get(userControl.userinfos)
user.route('/viewUser/:id').get(userControl.user)
// user.route('/logout').get(authControl.logOut) 


// user.route('/logout').get(authControl.logOut)
exports.user=user  