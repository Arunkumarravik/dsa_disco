document.getElementById('get-problem-btn').addEventListener('click', async () => {
    const type = document.getElementById('problem-type').value;
    const topic = document.getElementById('dsa-topic').value;

    // Call backend API
    const response = await fetch('/api/get_problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, topic })
    });
    const data = await response.json();

    document.getElementById('problem-description').innerText = data.description;
});

// Toggle chat sidebar
document.getElementById('toggle-chat').addEventListener('click', () => {
    const chatSidebar = document.getElementById('chat-sidebar');
    chatSidebar.classList.toggle('hidden'); // add .hidden in CSS
});

// Chat send
document.getElementById('send-chat').addEventListener('click', async () => {
    const input = document.getElementById('chat-input').value;
    const chatOutput = document.getElementById('chat-output');

    // Call backend API
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
    });
    const data = await response.json();

    chatOutput.innerHTML += `<div class="chat-msg">You: ${input}</div>`;
    chatOutput.innerHTML += `<div class="chat-msg bot">Bot: ${data.answer}</div>`;
    document.getElementById('chat-input').value = '';
});

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}
function togglerightSidebar() {
 const sidebar = document.querySelector('.right-sidebar');
const button = document.querySelector('.toggle-chat');

    // Toggle the sidebar visibility
sidebar.classList.toggle('hidden');

    // Change button text based on sidebar state
if (sidebar.classList.contains('hidden')) {
    button.innerHTML = 'Open Chat';
} else {
        button.innerHTML = 'Close Chat';
    }
}
