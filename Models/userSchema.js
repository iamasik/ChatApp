const mongoose=require('mongoose')
const validator=require('validator')

const User= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name."]
    },
    email:{
        type:String,
        required:[true,"Enter your mail address."],
        validator:[validator.isEmail,'Enter your right mail'],
        uniqe:true
    },
    phone:{
        type:String,
        required:[true,'Enter your phone number.'],
        uniqe:true
    },
    dob:Date,
    username:{
        type:String,
        require:[true,'Enter your username.'],
        uniqe:true,
        validator:function(data){
            return data.length<=20
        }
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
        require:true,
        validator:function(data){
            return data==this.password
        }
    },
    passwordChangeAt:Date
},
// virtual property show
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const users=mongoose.model('users',User)
module.exports=users