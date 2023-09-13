const catchError=require('../Utils/catchError')
const users=require('../Models/userSchema')

exports.userinfos=catchError(async (req,res,next)=>{
    const usersInfo=await users.find()
    res.status(200).json({
        status:"success",
        data:usersInfo
    })
})
exports.user=catchError(async (req,res,next)=>{
    const userInfo=await users.findById(req.params.id)
    res.status(200).json({
        status:"success",
        data:userInfo
    })
})
exports.adduser=catchError(async (req,res,next)=>{
    const newUser=await users.create(req.body)
    res.status(200).json({
        status:"success",
        data:newUser
    })
})
exports.deleteUser=catchError(async (req,res,next)=>{
    const deleteUser=await users.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"success"
    })
})
exports.updateUser=catchError(async(req,res,next)=>{
    const updatedInfo=await users.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json({
        status:"success",
        data:updatedInfo
    })
})
