
document.addEventListener("DOMContentLoaded", async () => {
    await loadProblems(); // Initial load
});

async function loadProblems(forceRefresh = false) {
    const tableBody = document.getElementById("problems-table");
    tableBody.innerHTML = ""; // Clear existing rows

    const storageKey = "solved_problems";
    let problems;

    try {
      // 1️⃣ Check cache (unless refresh is requested)
      if (!forceRefresh) {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          console.log("✅ Loaded from localStorage");
          problems = JSON.parse(cached);
        }
      }

      // 2️⃣ Fetch from backend if no cache or refresh
      if (!problems) {
        console.log("⬇️ Fetching from backend...");
        const payload = {
          event: "get",
          type: "solved_problems",
          user_id: 1
        };

        const response = await fetch("https://dsagetproblemdetails-214580149659.us-west1.run.app", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        problems = await response.json();

        // Save to localStorage
        localStorage.setItem(storageKey, JSON.stringify(problems));
      }

      // 3️⃣ Render table
      problems.forEach((p, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${p.problem_id || index + 1}</td>
          <td>${p.problem_name}</td>
          <td>${p.topic}</td>
          <td>${p.problem_creation_date}</td>
          <td><button class="solve-btn" onclick="navigateToProblem('${p.problem_name}', '${p.topic || ""}')">Solve Again</button></td>
        `;
        tableBody.appendChild(row);
      });

    } catch (error) {
      console.error("Error fetching solved problems:", error);
      tableBody.innerHTML = "<tr><td colspan='5'>Failed to load solved problems.</td></tr>";
    }
  }

  // Format date as dd - mm - yyyy
  function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  }

  // Navigate to problem editor
  function navigateToProblem(title, topic) {
    const url = `dsa_problem_editor_page.html?title=${encodeURIComponent(title)}&topic=${encodeURIComponent(topic)}`;
    window.location.href = url;
  }

  // Search filter
  document.getElementById("search-input").addEventListener("keyup", function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll("#problems-table tr");
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(filter) ? "" : "none";
    });
  });

  // Refresh button handler
  function refreshProblems() {
    localStorage.removeItem("solved_problems"); // clear cache
    loadProblems(true); // force fetch
  }

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('collapsed');
}