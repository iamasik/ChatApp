const express=require('express')
const viewControl=require('./../Controllers/viewControl')
const authControl=require('../Controllers/authControl')

const view=express.Router()
view.route('/').get(authControl.isLoggedIn, viewControl.index)
view.route('/dashBoard').get(authControl.isAuthenticate,viewControl.dashBoard)
view.route('/updateUser').get(authControl.isAuthenticate,viewControl.updateUser)
view.route('/profile').get(authControl.isAuthenticate,viewControl.profile)


exports.view=view