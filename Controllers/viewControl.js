const catchError=require('../Utils/catchError')

exports.index=catchError(async (req,res,next)=>{
    res.status(200).render('index',{title:"ChatApp"})
}) 