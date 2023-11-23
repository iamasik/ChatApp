
const RegNow=document.querySelector('.Registernow')
if(RegNow){
    RegNow.addEventListener('click',e=>{
        e.preventDefault()
        document.querySelector('#login').setAttribute('style','display: none;')
        document.querySelector('#singup').removeAttribute('style')
    })
}


const LoginNow=document.querySelector('.loginnow')
if(LoginNow){
    LoginNow.addEventListener('click',e=>{
        e.preventDefault()
        document.querySelector('#login').removeAttribute('style')
        document.querySelector('#singup').setAttribute('style','display: none;')
    })
}