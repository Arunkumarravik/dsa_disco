
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}

// Define one function for both buttons
async function handleCodeAction(actionType) {
  const code = window.codeEditor.getValue();
  const title = document.getElementById("problem-title").innerText;

  const payload = {
    "event": actionType, // "run" or "submit"
    "run_type": "solution",
    "code_def" : code,
    "problem_name" : title ,
    "user_id" : 1
  };

  const response = await fetch("https://dsadiscobackendtest-214580149659.us-west1.run.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await response.json();
  console.log(`${actionType} response:`, result);

  // Show in result panel
  document.getElementById("test-result").innerText = JSON.stringify(result, null, 2);
}

// Attach the same listener to both buttons
document.getElementById("run-code-btn").addEventListener("click", () => handleCodeAction("run"));
document.getElementById("submit-code-btn").addEventListener("click", () => handleCodeAction("submit"));
