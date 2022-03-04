'use strict'

//  Declration of variables
const body = document.querySelector('body');
const addInput = document.querySelector('.todo-input');
const addButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
let taskValues = [];
let sum = 0;

// Event Listener 
addButton.addEventListener('click', addNewTask);
document.addEventListener("DOMContentLoaded", getTasksOnLoad);

// add button function
function addNewTask(e) {
  e.preventDefault();
  if (addInput.value === "") {
    return;
  }

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
  const containerDiv = document.createElement('div')
  todoList.appendChild(containerDiv)
  let alertDiv = document.createElement('div');
  todoList.appendChild(alertDiv);

  // add classes 
  flexDiv.classList.add('flex-div');
  editBtn.classList.add('btn')
  editBtn.classList.add('edit-btn')
  removeBtn.classList.add('btn')
  li.classList.add('list-text')
  div.classList.add('right-div')

  saveToLocalStorage();

  removeBtn.addEventListener('click', removeTask);
  function removeTask() {
    sum = 0;
    flexDiv.remove();
    alertDiv.remove();
    containerDiv.remove(); // changed
    taskValues = JSON.parse(localStorage.getItem('keyElements'));
    let taskIndex = taskValues.indexOf(li.textContent);
    taskValues.splice(taskIndex, 1);
    localStorage.setItem('keyElements', JSON.stringify(taskValues));
  }

  editBtn.addEventListener('click', createSaveBtn)
  function createSaveBtn() {
    if (sum === 0) {
      sum += 1;
      const saveDiv = document.createElement('div');
      containerDiv.appendChild(saveDiv)

      const editInput = document.createElement('input');
      saveDiv.appendChild(editInput)
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'save';
      saveDiv.appendChild(saveBtn);
      saveBtn.addEventListener('click', taskEdit)

      // add classes
      saveDiv.classList.add('save-flex')
      editInput.classList.add('edit-input')
      saveBtn.classList.add('btn')
      saveBtn.classList.add('save-button')
      alertDiv.classList.add('alert-div')

      function taskEdit() {
        if (sum === 1 && editInput.value !== '') {
          sum -= 1
          taskValues = JSON.parse(localStorage.getItem('keyElements'));
          let taskIndex = taskValues.indexOf(li.textContent);
          taskValues.splice(taskIndex, 1, editInput.value)
          li.textContent = editInput.value;
          localStorage.setItem('keyElements', JSON.stringify(taskValues))
          editInput.value = "";
          editInput.remove()
          saveBtn.remove()
          alertDiv.textContent = ""
          saveDiv.remove()
        } else {
          alertDiv.textContent = "the field is empty"
        }
      }
    }
  }
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
    const containerDiv = document.createElement('div')
    todoList.appendChild(containerDiv)
    let alertDiv = document.createElement('div');
    todoList.appendChild(alertDiv);

    // add classes 
    flexDiv.classList.add('flex-div');
    editBtn.classList.add('btn')
    editBtn.classList.add('edit-btn')
    removeBtn.classList.add('btn')
    li.classList.add('list-text')
    div.classList.add('right-div')

    removeBtn.addEventListener('click', removeTask);
    function removeTask() {
      sum = 0
      flexDiv.remove();
      alertDiv.remove()
      containerDiv.remove(); // changed
      taskValues = JSON.parse(localStorage.getItem('keyElements'));
      let taskIndex = taskValues.indexOf(li.textContent);
      taskValues.splice(taskIndex, 1);
      localStorage.setItem('keyElements', JSON.stringify(taskValues));
    }
    editBtn.addEventListener('click', createSaveBtn)
    function createSaveBtn() {
      if (sum === 0) {
        sum += 1;
        const saveDiv = document.createElement('div');
        containerDiv.appendChild(saveDiv)
        const editInput = document.createElement('input');
        saveDiv.appendChild(editInput)
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'save';
        saveDiv.appendChild(saveBtn);
        saveBtn.addEventListener('click', taskEdit)

        // add classes
        saveDiv.classList.add('save-flex')
        editInput.classList.add('edit-input')
        saveBtn.classList.add('btn')
        saveBtn.classList.add('save-button')
        alertDiv.classList.add('alert-div')

        function taskEdit() {
          if (sum === 1 && editInput.value !== '') {
            sum -= 1
            taskValues = JSON.parse(localStorage.getItem('keyElements'));
            let taskIndex = taskValues.indexOf(li.textContent);
            taskValues.splice(taskIndex, 1, editInput.value)
            li.textContent = editInput.value;
            localStorage.setItem('keyElements', JSON.stringify(taskValues))
            editInput.value = "";
            editInput.remove()
            saveBtn.remove()
            alertDiv.textContent = ""
            saveDiv.remove()
          } else {
            alertDiv.textContent = "The field is empty"
          }
        }
      }
    }
  })
}

