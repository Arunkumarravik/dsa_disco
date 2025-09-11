function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentFormattedDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

document.getElementById('get-problem-btn').addEventListener('click', async () => {
    const type = document.getElementById('problem-type').value;
    const topic = document.getElementById('dsa-topic').value;
    const difficulty = document.getElementById('problem-difficulty').value;
    const user_id=1
    const user_name="Arun kumar R"
    const problem_id=getRandomInt(1, 100000)
    const today_date=getCurrentFormattedDate()
    // Call backend API

    title_payload={
        "user_id" :  user_id , 
        "user_name": user_name ,
        "problem_id": problem_id,
        "topic" : topic ,
        "category" : type ,
        "difficulty" :  difficulty,
        "problem_creation_date" : today_date.toString()
    }

    payload={
        "event" :  "get-title",
        "type" :  "main",
        "data" :  title_payload
    }
    const response = await fetch('https://dsadiscobackend-214580149659.us-west1.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json();

    console.log(data)

    // Create route button dynamically
    // Create wrapper div
    const problemDiv = document.createElement("div");
    problemDiv.classList.add("problem-row");

    // Title text
    const titleSpan = document.createElement("span");
    titleSpan.innerText = `${data.title} (${topic})`;

    // Solve button
    const editorBtn = document.createElement("button");
    editorBtn.classList.add("solve-btn");
    editorBtn.innerText = "Solve";
    editorBtn.addEventListener("click", () => {
        const url = `dsa_problem_editor_page.html?title=${encodeURIComponent(data.title)}&topic=${encodeURIComponent(topic)}`;
        window.location.href = url;
    });

    // Append title + button
    problemDiv.appendChild(titleSpan);
    problemDiv.appendChild(editorBtn);

    // Add to container
    document.getElementById("solve-prb").appendChild(problemDiv);

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


