
const singupusers=async(singup)=>{
    try{
        const res=await axios({
            method:'POST',
            url:'http://127.0.0.1:2400/Api/v1/User/addinfo',
            data:singup 
        })
        if (res.data.status=='success'){
            document.querySelector('.info').innerHTML=`
            <div class="alert alert-success" role="alert">
            Singup Success..
            </div>
            `
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
                location.assign('/')
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



document.querySelector('#singup').addEventListener('submit',e=>{
    e.preventDefault()
    const singup={}
    singup.name=document.querySelector('#name').value
    singup.username=document.querySelector('#username').value
    singup.email=document.querySelector('#email').value
    singup.phone=document.querySelector('#phone').value
    singup.dob=document.querySelector('#dob').value
    singup.gender=document.querySelector('#gender').value
    singup.password=document.querySelector('#password').value
    singup.confirmpassword=document.querySelector('#confirmpassword').value
    singupusers(singup)
})

document.querySelector('#login').addEventListener('submit',e=>{
    e.preventDefault()
    const singin={}
    singin.username=document.querySelector('#username').value
    singin.password=document.querySelector('#password').value
    singinusers(singin)
})


document.querySelector('.Registernow').addEventListener('click',e=>{
    e.preventDefault()
    document.querySelector('#login').setAttribute('style','display: none;')
    document.querySelector('#singup').removeAttribute('style')
})
document.querySelector('.loginnow').addEventListener('click',e=>{
    e.preventDefault()
    document.querySelector('#login').removeAttribute('style')
    document.querySelector('#singup').setAttribute('style','display: none;')
})