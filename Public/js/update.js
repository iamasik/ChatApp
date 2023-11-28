
const UpdateData= async(Update)=>{
    try{
        const res=await axios({
            method:'patch',
            url:'http://127.0.0.1:2400/Api/v1/User/updateUser',
            data:Update 
        })
        if (res.data.status=='success'){
            document.querySelector('.info').innerHTML=`
            <div class="alert alert-success" role="alert">
            Update Success..
            </div>
            `
            window.setTimeout(()=>{
                document.querySelector('.info').innerHTML=``
                location.assign('/updateUser')
            },1500)
        }
    }catch(err){
        if(err){
            document.querySelector('.info').innerHTML=`
            <div class="alert alert-danger" role="alert">
           ${ err.response.data.message}
            </div>`
            window.setTimeout(()=>{
                document.querySelector('.info').innerHTML=``
            },5000)
        }
    }
}

const Data=document.querySelector('.update')
if(Data){
    Data.addEventListener('submit',e=>{
        e.preventDefault()
        const Update=new FormData()
        Update.append('name',document.querySelector('#name').value)
        Update.append('email',document.querySelector('#email').value)
        Update.append('phone',document.querySelector('#phone').value)
        Update.append('gender',document.querySelector('#gender').value)
        const image=document.getElementById('image').files[0]
        if(image){
            Update.append('image',image)
        }
        UpdateData(Update)
        // const formDataObject = {};
        // Update.forEach((value, key) => {
        //     formDataObject[key] = value;
        // });
        // console.log(formDataObject);
    })
}