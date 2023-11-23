const logout=async()=>{
    try{
        const res=await axios({
            method:'GET',
            url:'http://127.0.0.1:2400/Api/v1/User/logout',
        })
    if(res.data.status=="success"){
        location.assign("/")
    }
    }catch(err){
        alert("Something is wrong..")
    }
}


const Check=document.querySelector(".logout")
if(Check){
    Check.addEventListener('click',e=>{
        e.preventDefault()
        logout()
    })
}