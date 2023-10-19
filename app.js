// _________Initial setup_______
const express=require("express")
const app=express()
app.use(express.json())

const morgan = require("morgan") 
app.use(morgan('dev'))

// https://nodejs.org/api/path.html#path_path_resolve_paths
const path=require('path')

const cookieParser=require('cookie-parser')
app.use(cookieParser()) 
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
