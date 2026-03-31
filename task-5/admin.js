adminUI();

async function adminUI() {
  const usersRes = await fetch("http://localhost:3000/users");
  const formRes = await fetch("http://localhost:3000/formdata");

  const users = await usersRes.json();
  const formdata = await formRes.json();

  const data = formdata.map((f) => {
    const user = users.find((u) => u.id === f.user_id);
    return {
      ...f,
      username: user ? user.username : "Unknown",
    };
  });

  const totalParticipants = data.length;
  const averageScore = Math.round(
    data.reduce((sum, u) => sum + u.percentage, 0) / data.length,
  );
  const highestScore = Math.max(...data.map((u) => u.percentage));
  const lowestScore = Math.min(...data.map((u) => u.percentage));

  document.getElementById("card-total-task-value").innerText =
    totalParticipants;
  document.getElementById("card-completed-value").innerText =
    averageScore + "%";
  document.getElementById("card-pending-value").innerText = highestScore + "%";
  document.getElementById("card-progress-value").innerText = lowestScore + "%";

  const table = document.getElementById("table-body");

  data.sort((a, b) => b.percentage - a.percentage);

  data.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.correct}</td>
      <td>${user.wrong}</td>
      <td>${user.percentage}%</td>
    `;

    table.appendChild(row);
  });

  console.log(data);
}
