const ChatNow=document.querySelectorAll('.ChatNow')

for (let i=0;  i<ChatNow.length+1; i++){
    ChatNow[i].addEventListener('click',e=> {
        document.querySelector('.openWindow').classList.add('hide')
        document.querySelector('.startChating').classList.remove('hide')
    })
}