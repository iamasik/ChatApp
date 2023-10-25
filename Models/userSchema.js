const mongoose=require('mongoose')
const validator=require('validator')
// const bcrypt=require('bcrypt')
const bcrypt=require('bcryptjs')

const User= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name."]
    },
    email:{
        type:String,
        required:[true,"Enter your mail address."],
        validate:[validator.isEmail,'Enter your right mail'],
        unique:true
    },
    phone:{
        type:String,
        required:[true,'Enter your phone number.'],
        unique:true
    }, 
    dob:Date,
    username:{
        type:String,
        required:[true,'Enter your username.'],
        unique:true,
        validate:[function(data){
            return data.length<=20
        },"Enter less then 20 char"]
    },
    image:{
        type:String
    }, 
    gender:{
        type:String,
        enum:['male','female','others']
    },
    password:{
        type:String,
        required:true,
        minlength:[8,'Enter minimum 8 charecter.'], 
        select:false
    },
    confirmpassword:{
        type:String,
        required:true,
        validator:function(data){
            return data==this.password
        }
    },
    is_online:{
        type:String,
        default:"0"
    },
    passwordChangeAt:Date
},
// virtual property show
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// password hasing and remove confirm password
User.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,12)
    this.confirmpassword=undefined
    next()
})

//Check is the login password correct
User.methods.isPasswordCorrect=async function(candidatePassword,originalPassword){
    return await bcrypt.compare(candidatePassword,originalPassword)
}

// User.methods.isPasswordCHnaged=async function(tokenTime){

//     return false
// }

const users=mongoose.model('users',User)
module.exports=users