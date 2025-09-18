
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}

// Define one function for both buttons
async function handleCodeAction(actionType) {
  const code = window.codeEditor.getValue();
  const title = document.getElementById("problem-title").innerText;

    try {
    const payload = {
      "event": actionType, // "run" or "submit"
      "run_type": actionType,
      "code_def": code,
      "problem_name": title,
      "user_id": 1
    };

    const response = await fetch("https://dsadiscobackendtest-214580149659.us-west1.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`${actionType} response:`, result);

    // ✅ continue with your table mapping logic here
    // e.g., build rows in test-result
    const tableBody = document.getElementById("test-result-table");
    tableBody.innerHTML = ""; // clear old results

  if (Array.isArray(result.status)) {
    result.status.forEach((test, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${Array.isArray(test.input) ? test.input.join(", ") : test.input}</td>
        <td>${test.expected}</td>
        <td>${test.actual !== null ? test.actual : "null"}</td>
        <td style="color:${test.status.toLowerCase() === "passed" ? "green" : "red"};">
          ${test.status}
        </td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    tableBody.innerHTML = `<tr><td colspan="5">⚠️ No test cases returned</td></tr>`;
  }

  } catch (error) {
    console.error("Error during POST request:", error);

    const testResultDiv = document.getElementById("test-result");
    if (testResultDiv) {
      testResultDiv.innerHTML = `
        <h3 style="color:red;">Error</h3>
        <p>${error.message}</p>
      `;
    }
  }

  // Show in result panel
  

}

// Attach the same listener to both buttons
document.getElementById("run-code-btn").addEventListener("click", () => handleCodeAction("run"));
document.getElementById("submit-code-btn").addEventListener("click", () => handleCodeAction("submit"));
