window.addEventListener("beforeunload", (e) => {
  console.trace("PAGE IS UNLOADING");
});

// Sample questions for the quiz
const qs = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Earth", "Venus", "Mercury", "Mars"],
    answer: "Mercury",
  },
  {
    question: "What is 7 × 8?",
    options: ["54", "56", "64", "48"],
    answer: "56",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Jane Austen",
      "William Shakespeare",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
];
// variable for the start and reset buttons
const startbutton = document.getElementById("start-button");
const resetbutton = document.getElementById("reset-button");
let username = "";
let user_id = "";
let i = 0;
let score = 0;

// Event listener for the start button to begin the quiz
startbutton.addEventListener("click", async (e) => {
  e.preventDefault();

  username = document.getElementById("user-name").value;

  if (!username) {
    return alert("Enter username");
  }

  const res = await fetch(`http://localhost:3000/users?username=${username}`);
  const data = await res.json();

  if (data.length) {
    window.location.hash = "add-task-success";
    return;
  }

  const newUser = { username };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data1 = await response.json();
  user_id = data1.id;

  document.querySelector(".start-card").style.display = "none";
  document.querySelector(".quiz-card").style.display = "flex";
  load();
});

// Function to load the current question
function load() {
  document.getElementById("question").textContent = qs[i].question;
  document.querySelector(".options-container").innerHTML = qs[i].options
    .map((o) => `<button type="button" onclick="check('${o}')">${o}</button>`)
    .join("");
}

// Function to check the user's answer
function check(ans) {
  if (ans === qs[i].answer) {
    score++;
  }
  if (++i < qs.length) {
    load();
  } else {
    showResult();
  }
}

// Function to display the quiz results
async function showResult() {
  document.querySelector(".quiz-card").style.display = "none";
  document.querySelector(".result-card").style.display = "flex";
  document.getElementById("card-total-ques-value").innerText = qs.length;
  document.getElementById("card-completed-value").innerText = score;
  document.getElementById("card-pending-value").innerText = qs.length - score;
  document.getElementById("card-progress-value").innerText =
    Math.round((score / qs.length) * 100) + "%";

  const value = {
    user_id: user_id,
    questions: qs.length,
    correct: score,
    wrong: qs.length - score,
    percentage: Math.round((score / qs.length) * 100),
  };

  await fetch("http://localhost:3000/formdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
}

resetbutton.addEventListener("click", () => {
  location.reload();
});
