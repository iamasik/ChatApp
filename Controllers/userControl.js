const catchError=require('../Utils/catchError')
const users=require('../Models/userSchema')
const OperationalError=require('../Utils/OperationalError')

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
    const data={}
    data.email=req.body.email
    data.username=req.body.username
    data.name=req.body.name
    data.phone=req.body.phone
    data.dob=req.body.dob
    data.gender=req.body.gender
    if(req.file){
        data.image='images/'+req.file.filename
    }
    data.password=req.body.password
    data.confirmpassword=req.body.confirmpassword
    if(!(data.password==data.confirmpassword)){
        return next(new OperationalError("Password doesn't match",401))
    }
    const newUser=await users.create(data)
    res.status(200).json({
        status:"success",
        data:newUser
    })
})


exports.deleteUser=catchError(async (req,res,next)=>{
    const deleteUser=await users.findByIdAndDelete(req.userData.id)
    res.status(200).json({
        status:"success"
    })
})


exports.updateUser=catchError(async(req,res,next)=>{
    const Update={}
    Update.name=req.body.name
    Update.email=req.body.email
    Update.phone=req.body.phone
    Update.gender=req.body.gender
    if(req.file){
        Update.image='images/'+req.file.filename
    }
    const updatedInfo=await users.findByIdAndUpdate(req.userData.id,Update,{
        new:true
    })
    res.status(200).json({
        status:"success",
        data:updatedInfo
    })
})
