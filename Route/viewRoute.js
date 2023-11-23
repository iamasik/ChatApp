const express=require('express')
const viewControl=require('./../Controllers/viewControl')
const authControl=require('../Controllers/authControl')


const view=express.Router()

view.route('/').get(viewControl.index)
view.route('/dashBoard').get(authControl.isAuthenticate,viewControl.dashBoard)

exports.view=view  