const catchError=require('../Utils/catchError')

exports.index=catchError(async (req,res,next)=>{
    res.status(200).render('index',{title:"ChatApp"})
}) 
exports.dashBoard=catchError(async (req,res,next)=>{
    res.status(200).render('dashBoard',{title:"dashBoard"})
}) 