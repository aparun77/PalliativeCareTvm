// DOM elements
const inboxToggle = document.getElementById('inboxToggle');
const inboxDropdown = document.getElementById('inboxDropdown');
const msgCount = document.getElementById('msgCount');

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
  msgCount.textContent = messages.length;

  inboxDropdown.innerHTML = ''; // Clear previous messages

  if(messages.length === 0){
    const p = document.createElement('p');
    p.className = 'no-messages';
    p.textContent = 'No messages';
    inboxDropdown.appendChild(p);
    return;
  }

  // Display messages one by one, newest first
  messages.slice().reverse().forEach(msg => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${msg.name}</strong><br><small>${msg.email}</small>`;
    inboxDropdown.appendChild(p);
  });
}

// Toggle dropdown visibility
inboxToggle.addEventListener('click', (e)=>{
  e.preventDefault();
  inboxDropdown.classList.toggle('show');
});

// Close dropdown if clicked outside
document.addEventListener('click', (e)=>{
  if(!inboxToggle.contains(e.target) && !inboxDropdown.contains(e.target)){
    inboxDropdown.classList.remove('show');
  }
});

// Initialize messages on page load
loadMessages();
