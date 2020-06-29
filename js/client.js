const socket = io("http://localhost:8000");

const form = document.getElementById('form');
const textarea = document.getElementById('textarea');
const chatContainer = document.querySelector('.chat_container');

const appendjoined = (message) => {
  const messgaeElement = document.createElement('div');
  messgaeElement.innerText = message;
  messgaeElement.classList.add("message-for-join");
  chatContainer.append(messgaeElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; 



}

const appendChatYou = (message)=>{
  var leftbubblechat = '<div class="left_message"><span class="left_text">'+message+'</span></div>';
  const leftbubble = document.createElement("div");
  leftbubble.classList.add("left-bubble");
  leftbubble.innerHTML = leftbubblechat;
  chatContainer.append(leftbubble);
  chatContainer.scrollTop = chatContainer.scrollHeight; 
}
const appendChatOther = (user,message)=>{
  
  var rightbubblechat = '<div class="right_message"><div class="heading-text">'+user+'</div><span class="right_text">'+message+'</span></div>';
  const rightbubble = document.createElement("div");
  rightbubble.classList.add("right-bubble");
  rightbubble.innerHTML = rightbubblechat;
  chatContainer.append(rightbubble);
  chatContainer.scrollTop = chatContainer.scrollHeight;

}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const chat = textarea.value;
  if(chat == null || chat == "" || chat == undefined)
  {}
  else{
  appendChatYou(chat);
  socket.emit("send",chat);
  textarea.value = '';
  }

  


})
function getName(){
var name = prompt("Enter your name for joining chat room","Harray Potter")

if(name == null || name == "" || name==undefined)
{
  getName();
}
else{
  socket.emit("new-user-joined", name);
  
  socket.on('user-joined', name => {
    appendjoined(`${name} joined the chat`);
  })
  socket.on('receive',data=>{
   
   appendChatOther(`${data.name}`,`${data.message}`);
  
  })

}

}
getName();


