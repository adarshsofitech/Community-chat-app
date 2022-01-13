const href = localStorage.getItem('href');
const socket = io(href);

const form = document.getElementById('send-container');
const msginput = document.getElementById('msginput');
const msgContainer = document.querySelector(".container");
const send_container = document.getElementById('send');

// var audio = new Audio('/tone.mp3');

const append = (message,position,color)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    if(color==1){
        msgElement.setAttribute('style',`background-color:#ff888;`)
    }
    msgContainer.append(msgElement);
    if(position=='left'){
        document.getElementById('myaudio').play();
    }
    msgContainer.scrollTop = msgContainer.scrollHeight;
};
const name = localStorage.getItem('name');
form.addEventListener('submit',(e)=>{
    e.preventDefault(); //to prevent reloading
    const message = msginput.value;
    if(message.length!=0){
        socket.emit('send',message);
    }
    append(`You : ${message}`,'right',0);
    msginput.value = '';
})
// const name = prompt("Enter your name to join");
socket.on("connect",()=>{
    socket.emit('new-user-joined', name)
})

socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left',1);
})
socket.on('userfirst',userlen=>{
    usercount = document.createElement('div');
    usercount.innerHTML = `<h4>Members : ${userlen}</h4>`;
    send_container.appendChild(usercount);
})
socket.on('update-usercount',userlen =>{
    usercount = document.querySelector('#send div');
    usercount.innerHTML = `<h4>Members : ${userlen}</h4>`;
})
socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`,'left',0);
})

socket.on('leave',data =>{
    append(`${data} left the chat`,'left',1);
})
