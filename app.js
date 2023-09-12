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

app.use('/',viewRoute.view)
app.use('/Api/v1/User',userRoute.user)
exports.app=app