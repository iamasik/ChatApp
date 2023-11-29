const OperationalError=require('../Utils/OperationalError')


const developmentError=function(err,req,res){
    if(req.originalUrl.startsWith('/Api')){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message,
            err,
            code:err.statusCode, 
            stak:err.stack 

        }) 
    }else{
        res.status(err.statusCode).json({
            err, 
            stak:err.stack,
            data:"something is wrong"
        })
    }
} 

const productionError=function(err,req,res){
    if(err.isOperational){
        if(err.statusCode==404){
            res.status(200).render('404',{title:"Page not found",ViewData:undefined})
        }
        else{
            res.status(err.statusCode).json({
                stak:err.stack ,
                err,
                status:err.status,
                message:err.message,
                code:err.statusCode
            })
        }
    }else{
        res.status(500).json({
            err,
            data:"something is wrong"
        }) 
    }
 
} 

 
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500
    err.status= err.status || "error"
    

    if(process.env.Mode=="development"){
        developmentError(err,req,res)
    }
    else if(process.env.Mode=="production"){

        //Validator
        if(err.name=="ValidationError"){
            const msg=Object.values(err.errors).map(el=> el.message)
            err=new OperationalError(msg,401)
        } 
        //Duplicate entry
        if(err.code==11000){
            const msg=`Duplicate entry for =>${err.message.match(/"([^"]*)"/)[1]}`
            err=new OperationalError(msg,401)
        } 
        //invalid Id
        if(err.name=="CastError"){
            err=new OperationalError("Please enter valid id",401)
        }
        //Invalid Token
        if(err.name=="JsonWebTokenError"){
            err=new OperationalError("invalid token",401)
        }
        //Token time expired
        if(err.name=="TokenExpiredError"){
            err=new OperationalError("Your token time expired please login again",401)
        }
        productionError(err,req,res)
    }
    
}