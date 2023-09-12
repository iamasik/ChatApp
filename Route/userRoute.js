const express=require('express')
const userControl=require('./../Controllers/userControl')

const user=express.Router()
user.route('/addinfo').post(userControl.adduser)
exports.user=user