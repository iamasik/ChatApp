const JWT=require('jsonwebtoken')
const users=require('../Models/userSchema')
const catchError=require('../Utils/catchError')


// Genrate token
const token=(id)=>{
    return JWT.sign({id},process.env.JWTSecret,{expiresIn:process.env.JWTExpire})
}

exports.login=catchError(async function(req,res,next){
    const {username, password}=req.body
    if(!username || !password){
        console.log('ENter correct email and password.')
    }
    const user=await users.findOne({username}).select('+password')
    if(!user || !await user.isPasswordCorrect(password,user.password)){
        console.log("something is wrong.");
        return next()
    }
    //TOken genrate


    //Response
    res.status(200).json({
        status:"success"
    })
})