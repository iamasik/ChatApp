const StartApp=require('./app')
const mongoose= require('mongoose')

const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})

const DB=process.env.Database.replace("<password>",process.env.Password)
mongoose.set("strictQuery", false);

async function Connection() {
    try{
        await mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DataBase Connected");
    }
    catch(err){
        console.log(`Connection failed: ${err.message}`);
        process.exit(1)
    }
}
Connection()

const Server=StartApp.app.listen(process.env.Port,()=>{
    console.log("Server Started")
})