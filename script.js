"use strict";

//!  Declarations and Selection of Elements
const formEl = document.querySelector(".add-tasks");
const addButtonEl = document.querySelector(".add-btn");
const addInputEl = document.querySelector(".todo-input");
const tasksContainer = document.querySelector(".tasks");
let taskValues = [];

// Generate random ID Function
const generateRandomId = () => Math.trunc(Math.random() * 1000000) + 1;

// Save to Local Storage Function
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(taskValues));
};

const loadFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

// Render DOM Elements
const renderTask = (task) => {
  const { inputText, id, checkStatus } = task;
  const isChecked = checkStatus === "true";
  const lineThroughClass = isChecked ? "line-through" : "";
  const backgroundColor = isChecked ? "#5529DC" : "#ffffff";

  const taskHtml = `
    <div class="task" style="background-color: ${backgroundColor}">
      <div class="left-items">
        <input
          type="checkbox"
          name="task-checkbox"
          id="checkbox"
          class="checkbox"
          checkatt="${checkStatus}"
          ${isChecked ? "checked" : ""}
        />
        <p id="task-text" class="task-text ${lineThroughClass}" data-set="${id}">
          ${inputText}
        </p>
      </div>
      <div class="right-item display">
        <svg class="close-btn" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 z"></path>
        </svg>
      </div>
    </div>
  `;
  tasksContainer.insertAdjacentHTML("afterbegin", taskHtml);
};

const initializeTasks = () => {
  const storedTasks = loadFromLocalStorage();
  taskValues = storedTasks;
  storedTasks.forEach(renderTask);
};

// Add new task
const addNewTask = () => {
  const inputText = addInputEl.value.trim();
  if (!inputText) return;

  const id = generateRandomId();
  const newTask = { id, checkStatus: "false", inputText };

  taskValues.push(newTask);
  renderTask(newTask);
  saveToLocalStorage();
  addInputEl.value = "";
};

// Remove task
const removeTask = (taskElement) => {
  const taskID = +taskElement.querySelector(".task-text").dataset.set;
  taskValues = taskValues.filter((task) => task.id !== taskID);
  saveToLocalStorage();
  taskElement.remove();
};

// Toggle task completion
const toggleTaskCompletion = (checkbox) => {
  const taskElement = checkbox.closest(".task");
  const taskID = +checkbox.nextElementSibling.dataset.set;
  const task = taskValues.find((task) => task.id === taskID);

  if (checkbox.getAttribute("checkatt") === "false") {
    checkbox.nextElementSibling.classList.add("line-through");
    taskElement.style.backgroundColor = "#5529DC";
    checkbox.setAttribute("checkatt", "true");
    task.checkStatus = "true";
  } else {
    checkbox.nextElementSibling.classList.remove("line-through");
    taskElement.style.backgroundColor = "#ffffff";
    checkbox.setAttribute("checkatt", "false");
    task.checkStatus = "false";
  }

  saveToLocalStorage();
};

// Event Handlers
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
});

tasksContainer.addEventListener("mouseover", (e) => {
  if (e.target.closest(".task")) {
    const closeBtn = e.target.closest(".task").querySelector(".right-item");
    closeBtn.classList.remove("display");
  }
});

tasksContainer.addEventListener("mouseout", (e) => {
  if (e.target.closest(".task")) {
    const closeBtn = e.target.closest(".task").querySelector(".right-item");
    closeBtn.classList.add("display");
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.closest(".close-btn")) {
    const taskElement = e.target.closest(".task");
    removeTask(taskElement);
  } else if (e.target.classList.contains("checkbox")) {
    toggleTaskCompletion(e.target);
  }
});

// Initialize tasks on page load
window.addEventListener("load", initializeTasks);
