const singinusers=async(singin)=>{
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:2400/Api/v1/User/login',
            data:singin 
        })
        if (res.data.status=='success'){
            document.querySelector('.info2').innerHTML=`
            <div class="alert alert-success" role="alert">
            login Success..
            </div>
            `
            window.setTimeout(()=>{
                document.querySelector('.info2').innerHTML=``
                location.assign('/dashBoard')
            },1500)
        }
    }catch(err){
        document.querySelector('.info2').innerHTML=`
        <div class="alert alert-danger" role="alert">
       ${ err.response.data.message}
        </div>`
        window.setTimeout(()=>{
            document.querySelector('.info2').innerHTML=``
        },5000)
    }
}

const LoginUser=document.querySelector('#login')
if(LoginUser){
    LoginUser.addEventListener('submit',e=>{
        e.preventDefault()
        const singin={}
        singin.usernameOrEmail=document.querySelector('#usernameOrEmail').value
        singin.password=document.querySelector('#password2').value
        singinusers(singin)
    })
}




