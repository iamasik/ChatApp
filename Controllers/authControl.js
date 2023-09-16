const JWT=require('jsonwebtoken')
const users=require('../Models/userSchema')
const catchError=require('../Utils/catchError')
const OperationalError=require(`${__dirname}/../Utils/OperationalError`)
const { promisify } = require("util");



// Genrate token
const token=(id)=>{
    return JWT.sign({id},process.env.JWTSecret,{expiresIn:process.env.JWTExpire})
}

exports.login=catchError(async function(req,res,next){
    const {username, password}=req.body
    if(!username || !password){
        return next(new OperationalError('Fillup emapty field',400))
    }
    const user=await users.findOne({username}).select('+password')
    if(!user || !await user.isPasswordCorrect(password,user.password)){
        return next(new OperationalError('Enter correct email and password.',401))
    }
    //Token genrate
    const loginToken=token(user.id)

    const cookieOption={expires: new Date(Date.now()+process.env.JWTExpiresIn*24*60*60*1000),httpOnly:true}
    if(process.env.Mode='production') cookieOption.secure=true
    res.cookie("JWT",loginToken,cookieOption)

    //Response
    res.status(200).json({  
        status:"success",
        token:loginToken,
        data:cookieOption 
    })
})

exports.isAuthenticate=catchError(async function(req,res,next){
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1]
    } 
    else if(req.cookie.JWT){
        token=req.cookie.JWT
    }

    if(!token){
         return next(new OperationalError('Please login.',401))
    }

    const decode=await promisify(JWT.verify)(token,process.env.JWTSecret)
    const userData=await users.findById(decode.id)
    if(!userData){
        console.log("Didn't find");
    }

    req.userData=userData
    console.log("ok");
    next()
})

//Logout User
exports.logOut=(req,res)=>{
    const cookieOptions={expires:new Date(Date.now()+10*1000),httpOnly:true}
    res.cookie("JWT","Logged Out",cookieOptions)
    res.status(200).json({status:"success"})
  }