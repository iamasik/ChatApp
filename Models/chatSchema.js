const mongoose=require('mongoose')
const validator=require('validator')

const Chat= new mongoose.Schema({
    SenderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }, 
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    messages:{
        type:String
    }
},
{
timestamps:true
},
// virtual property show
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

exports.chatModel=mongoose.model('chats',Chat)