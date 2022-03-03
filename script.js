'use strict'

//  Declration of variables
const body = document.querySelector('body');
const addInput = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
let taskValues = [];

// Event Listener 

addButton.addEventListener('click', addNewTask);
document.addEventListener("DOMContentLoaded", getTasksOnLoad);

// add button function
function addNewTask(e) {
  e.preventDefault();

  const flexDiv = document.createElement('div');
  todoList.appendChild(flexDiv);
  const li = document.createElement('li')
  li.textContent = addInput.value;
  flexDiv.appendChild(li);
  const div = document.createElement('div');
  flexDiv.appendChild(div);
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  div.appendChild(editBtn);
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  div.appendChild(removeBtn);

  saveToLocalStorage();
  addInput.value = "";
}

// Save tasks into local storage
function saveToLocalStorage() {
  taskValues.push(addInput.value);
  localStorage.setItem('keyElements', JSON.stringify(taskValues))
}

// create onload function

function getTasksOnLoad() {
  if (localStorage.getItem("keyElements")) {
    taskValues = JSON.parse(localStorage.getItem("keyElements"));
  }
  taskValues.forEach((e) => {
    const flexDiv = document.createElement('div');
    todoList.appendChild(flexDiv);
    const li = document.createElement('li')
    li.textContent = e;
    flexDiv.appendChild(li);
    const div = document.createElement('div');
    flexDiv.appendChild(div);
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    div.appendChild(editBtn);
    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'Remove';
    div.appendChild(removeBtn);
  })
}

