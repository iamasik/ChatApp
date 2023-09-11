const app=require('./app')
const mongoose= require('mongoose')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const DB="mongodb+srv://dhasikdevApp:dcsp1dJz4QXVfE5M@cluster0.rprjf2d.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);

const Connection= function() {
    mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    print("COnnected")
}
