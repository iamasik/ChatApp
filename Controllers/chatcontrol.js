const app=require('./../app')
const userModel=require('./../Models/userSchema')
const catchError=require('../Utils/catchError')
const chats=require('../Models/chatSchema')


exports.start=catchError(async function(Data){
    const userId=Data.handshake.auth.token
    console.log('A user connected');

    Data.on('SendMsg', function(msg){
        Data.broadcast.emit('ReceiveMsg',{Datas:msg.data})
    })
    Data.on('loadData',async function(Usersinfo){
        const AllChat= await chats.find({$or:[{SenderId:Usersinfo.SenderId,ReceiverId:Usersinfo.ReceiverId},{SenderId:Usersinfo.ReceiverId,ReceiverId:Usersinfo.SenderId}]})
        Data.emit('ResLoadData',AllChat)
    })

    Data.on('DeleteMsg',function(Value){
        Data.broadcast.emit('BackDeleteMsg',{data:Value.data})
    })
    const data=await userModel.findByIdAndUpdate({_id:userId},{$set:{is_online:'1'}})
    Data.broadcast.emit('online',{id:Data.handshake.auth.token})

    Data.on('disconnect', async function(){
        console.log('A user disconnected');
        const userId=Data.handshake.auth.token
        const data=await userModel.findByIdAndUpdate({_id:userId},{$set:{is_online:'0'}})
        Data.broadcast.emit('offline',{id:Data.handshake.auth.token})
    })

})      