const deleteData=async(Data)=>{
    try{
        const res=await axios({
            method:'delete',
            url:'http://127.0.0.1:2400/Api/v1/User/deleteUser',
            data:Data 
        })
        if (res.data.status=='success'){
            window.setTimeout(()=>{
                document.querySelector('.info').innerHTML=``
                location.assign('/')
            },1500)
        }
    }catch(err){
        document.querySelector('.info').innerHTML=`
        <div class="alert alert-danger" role="alert">
       ${ err.response.data.message}
        </div>`
        window.setTimeout(()=>{
            document.querySelector('.info').innerHTML=``
        },5000)
    }
}

const Data=document.querySelector('.Delete')
if(Data){
    Data.addEventListener('click',e=>{
        const Data=0
        deleteData(Data)
    })
}