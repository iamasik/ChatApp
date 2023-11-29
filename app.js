// _________Initial setup_______
const express=require("express")
const app=express()
app.use(express.json())
  
//Socket programming
const http=require('http').Server(app) 
const io=require('socket.io')(http)

const chatcontrol=require('./Controllers/chatcontrol')
const cns=io.of('/chat')
exports.cns=cns
cns.on('connection',chatcontrol.start)


const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

// const morgan = require("morgan") 
// app.use(morgan('dev'))
 
// Get JWT cookie 
const cookieParser=require('cookie-parser') 
app.use(cookieParser());

// https://nodejs.org/api/path.html#path_path_resolve_paths
const path=require('path')

//Use static files
app.use(express.static(path.join(__dirname,"Public")))

//Set view engine
app.set('view engine','ejs')
app.set('views','./Views')

//__________Initial route_______ 
const viewRoute=require('./Route/viewRoute')
const userRoute=require('./Route/userRoute')

// Route
app.use('/',viewRoute.view)
app.use('/Api/v1/User',userRoute.user)

// Initial Error Control
const errorControl=require('./Utils/errorControl')
const isOperational=require('./Utils/OperationalError')


app.all("*",(req,res,next)=>{
    next( new isOperational(`Can't find ${req.originalUrl} this url.`,404))
})

//Error Handle
app.use(errorControl)

exports.app=app
exports.http=http
