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
    const {usernameOrEmail, password}=req.body
    if(!usernameOrEmail || !password){
        return next(new OperationalError('Fillup emapty field',400))
    }
    const user=await users.findOne({$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]}).select('+password')
    
    if(!user || !await user.isPasswordCorrect(password,user.password)){
        return next(new OperationalError('Enter correct email and password.',401))
    }
    //Token genrate
    const loginToken=token(user.id)
    const cookieOption={expires: new Date(Date.now()+process.env.JWTExpiresIn*24*60*60*1000),httpOnly:true}
    if(process.env.Mode='production') cookieOption.secure=true
    res.cookie('JWT',loginToken,cookieOption)
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
    else if(req.cookies.JWT){
        token=req.cookies.JWT
    }
  
    if(!token){
        res.redirect('/')
    }
 
    const decode=await promisify(JWT.verify)(token,process.env.JWTSecret)
    const userData=await users.findById(decode.id)
    if(!userData){
        return next(new OperationalError("You are not valid user.",401))
    }
    req.userData=userData
    const DOB = new Date(req.userData.dob);
    req.userData.dobDate = DOB.toISOString().split('T')[0];
    next()
})


exports.isLoggedIn = async (req, res, next) => {
    try{
      if(req.cookies.JWT){
  
        //Verify is the token is valid or not => To make it promisify we will use buildin package
        const Decode = await promisify(JWT.verify)(req.cookies.JWT, process.env.JWTSecret);

        console.log(Decode);
        //Is the user exist?
        const UserData = await users.findById(Decode.id);
        
        if (!UserData) {
          return next();
        }
        else{
            res.redirect('/dashBoard')
        }
      }
    }catch(err){
      return next();
    }
    next()
  };

//Logout User
exports.logOut=catchError(async function(req,res){
    const cookieOptions={expires:new Date(Date.now()+10*1000),httpOnly:true}
    res.cookie("JWT","Logged Out",cookieOptions)
    res.status(200).json({status:"success"})
  })