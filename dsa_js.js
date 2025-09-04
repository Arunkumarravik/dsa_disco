function navigate(page) {
  // simple client-side routing simulation
  const content = document.getElementById("content");

  if (page === "home") {
    content.innerHTML = `
      <div class="quote-box">"Placeholder for motivational quote..."</div>
      <button class="solve-btn" onclick="navigate('solve_problem')">Solve Problem</button>
      <h2 class="recent-title">Problems Solved Last Week</h2>
      <table class="recent-table">
        <thead>
          <tr>
            <th>Problem Name</th>
            <th>Date Solved</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="solved-placeholder">
          <tr>
            <td colspan="3" style="text-align:center; color:gray;">
              (Solved problems will appear here from backend)
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
  else if (page === "problem_list") {
    content.innerHTML = `<h2>Problem List</h2><p>(Placeholder for problem list)</p>`;
  }
  else if (page === "solved_problems") {
    content.innerHTML = `<h2>Solved Problems</h2><p>(Placeholder for solved problems page)</p>`;
  }
  else if (page === "solve_problem") {
    content.innerHTML = `<h2>Solve Problem</h2><p>(Placeholder for solving problems)</p>`;
  }
  else if (page === "profile") {
    content.innerHTML = `<h2>User Profile</h2><p>(Placeholder for profile info)</p>`;
  }
  else if (page === "stats") {
    content.innerHTML = `<h2>My Stats</h2><p>(Placeholder for user stats)</p>`;
  }
}

function logout() {
  alert("Logged out! (placeholder)");
}
