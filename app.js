// _________Initial setup_______
const express=require("express")
const app=express()
app.use(express.json())


const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})


const morgan = require("morgan") 
app.use(morgan('dev'))

const cookieParser=require('cookie-parser') 
app.use(cookieParser());


//Image handle
const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'./Public/images'))
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname
        cb(null,name)
    }
})
 
const upload=multer(({
    storage:storage
})) 
exports.upload=upload

// https://nodejs.org/api/path.html#path_path_resolve_paths
const path=require('path')



//__________Initial route_______ 

const viewRoute=require('./Route/viewRoute')
const userRoute=require('./Route/userRoute')
const errorControl=require('./Utils/errorControl')
const isOperational=require('./Utils/OperationalError')
 
 

//Use static files
app.use(express.static(path.join(__dirname,"Public")))

//Set view engine
app.set('view engine','ejs')
app.set('views','./Views')

app.use('/',viewRoute.view)
app.use('/Api/v1/User',userRoute.user)

app.all("*",(req,res,next)=>{

    next( new isOperational(`Can't find ${req.originalUrl} this url.`,404))
})


//Error Handle
app.use(errorControl)

exports.app=app
