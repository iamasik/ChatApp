const catchError=require('../Utils/catchError')
const users=require('../Models/userSchema')

exports.userinfos=catchError(async (req,res,next)=>{
    res.status(200).json({"status":"ok"})
})
exports.adduser=catchError(async (req,res,next)=>{
    const newUser=await users.create(req.body)
    res.status(200).json({
        status:"ok",
        data:newUser
    })
})