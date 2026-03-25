// variables for getting elements and storing data
const form = document.querySelector("#task-form"); // form element for adding new tasks
const taskList = document.querySelector(".task-list"); // container for displaying tasks
const empty_list = document.getElementById("empty-task-list"); // element to show when there are no tasks

let DeleteId = null;
let DeleteItem = null;

// Load tasks from localStorage or init new array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(renderTask);
updateUI();

//Event listener for adding a new task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value;
  const duedate = document.getElementById("task-due").value;
  const priority = document.getElementById("task-priority").value;
  const description = document.getElementById("task-desc").value;
  const rawdate = new Date();
  const date =
    rawdate.getDay() +
    "+" +
    (rawdate.getMonth() + 1) +
    "+" +
    rawdate.getFullYear();

  const newTask = {
    id: Date.now(),
    title,
    duedate,
    priority,
    description,
    date,
    completed: false,
  };

  tasks.push(newTask); //add new task to the array

  localStorage.setItem("tasks", JSON.stringify(tasks)); //update the task in localstorage

  renderTask(newTask); //update the new task in the UI

  updateUI();

  window.location.hash = "add-task-success";

  form.reset();
});

//function for updating the task overview cards
function updateUI() {
  if (tasks.length === 0) {
    empty_list.hidden = false;
  } else {
    empty_list.hidden = true;
  }

  const completed = tasks.filter((t) => t.completed === true).length;
  const pending = tasks.length - completed;
  const progress =
    tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

  document.getElementById("card-total-task-value").innerText = tasks.length;
  document.getElementById("card-completed-value").innerText = completed;
  document.getElementById("card-pending-value").innerText = pending;
  document.getElementById("card-progress-value").innerText = progress + "%";
}

//function for updating the task in the UI
function renderTask(task) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  //updating the task using innerhtml
  taskItem.innerHTML = `
    <div class="task-item-header">
      <div class="task-item-footer">
        <span>On: ${task.date}</span>
        <span>${task.priority}</span>
        <span>Due: ${task.duedate}</span>
      </div>
      <h3>${task.title}</h3>
    </div>
    <div class="task-item-body">
      <p>${task.description}</p>
    </div>
    <div class="task-item-buttons">
      <button class="task-complete-button">${task.completed ? "Mark as Undone" : "Mark as Done"}</button>
      <button class="task-delete-button">Delete</button>
    </div>
  `;

  //updating the task completed status
  let completed_status = taskItem.querySelector(".task-complete-button");

  completed_status.addEventListener("click", () => {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskItem.querySelector(".task-complete-button").textContent = task.completed
      ? "Mark as Undone"
      : "Mark as Done";
    updateUI();
  });

  //opening the task details popup
  taskItem.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    DeleteId = task.id;
    DeleteItem = taskItem;

    document.querySelector(
      "#detail-task-Popup .detail-sub-popup-header h2",
    ).innerText = task.title;
    document.querySelector("#detail-task-Popup .detail-sub-popup p").innerText =
      task.description;

    document.querySelector("#detail-task-Popup .detail-item-footer").innerHTML =
      `
      <span>On : ${task.date}</span>
      <span>${task.priority}</span>
      <span>Due : ${task.duedate}</span>
    `;
    window.location.hash = "detail-task-Popup";
  });

  //opening the delete confirmation popup
  let delete_button = taskItem.querySelector(".task-delete-button");
  
  delete_button.addEventListener("click", () => {
    DeleteId = task.id;
    DeleteItem = taskItem;
    window.location.hash = "delete-task-confirm";
  });

  taskList.appendChild(taskItem);
}

function deletetask() {
  if (!DeleteId) return;
  tasks = tasks.filter((t) => t.id !== DeleteId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  DeleteItem.remove();
  DeleteItem = null;
  DeleteId = null;
  updateUI();
  window.location.hash = "";
}

// Event listener for deleting a task after confirmation
document
  .querySelector("#detail-task-Popup .task-complete-button")
  .addEventListener("click", () => {
    deletetask();
  });

// Event listener for deleting a task after confirmation
document
  .querySelector("#delete-task-confirm .task-complete-button")
  .addEventListener("click", () => {
    deletetask();
  });
