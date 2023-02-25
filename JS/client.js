const socket = io('http://localhost:7000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
//ask fo new user for his/her name  let the server know
const name = prompt("Enter your name to join LetsChat")
socket.emit('new-user-joined', name)

//if a new user joins, recieve the event from the server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})
//if server send a message recieve it 
socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})
//if user leave the chat , append the informatio in the conntainer
socket.on('left', name=>{
    append(`${name } left the chat`, 'left');
})