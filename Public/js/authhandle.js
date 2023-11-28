
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

const AddUsers=document.querySelector('#singup')
if(AddUsers){
    AddUsers.addEventListener('submit',e=>{
        e.preventDefault()
        const formData= new FormData()
        formData.append('name',document.querySelector('#name').value)
        formData.append('username',document.querySelector('#username').value)
        formData.append('email',document.querySelector('#email').value)
        formData.append('phone',document.querySelector('#phone').value)
        formData.append('dob',document.querySelector('#dob').value)
        formData.append('gender',document.querySelector('#gender').value)
        const ImageData=document.getElementById('image').files[0]
        if(ImageData){
            formData.append('image',ImageData)
        }
        formData.append('password',document.querySelector('#password').value)
        formData.append('confirmpassword',document.querySelector('#confirmpassword').value)

        // const formDataObject = {};
        // formData.forEach((value, key) => {
        //     formDataObject[key] = value;
        // });
        // console.log(formDataObject);

        singupusers(formData)
    })
}



