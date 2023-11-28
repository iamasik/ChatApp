const catchError=require('../Utils/catchError')
const users=require('../Models/userSchema')

exports.index=catchError(async (req,res,next)=>{
    res.status(200).render('index',{title:"ChatApp",ViewData:undefined})
}) 
exports.dashBoard=catchError(async (req,res,next)=>{
    const Data=await users.find({_id:{$nin:[req.userData.id]}})
    res.status(200).render('dashBoard',{title:"dashBoard",ViewData:req.userData,Data:Data})
}) 
exports.updateUser=catchError(async (req,res,next)=>{
    res.status(200).render('updateuser',{title:"Update info",  ViewData:req.userData})
}) 
exports.profile=catchError(async (req,res,next)=>{
    res.status(200).render('profile',{title:"Update info",  ViewData:req.userData})
}) 
