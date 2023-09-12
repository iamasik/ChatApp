const express=require('express')
const viewControl=require('./../Controllers/viewControl')

const view=express.Router()
view.route('/').get(viewControl.index)
exports.view=view