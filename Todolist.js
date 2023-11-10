// Array to store tasks
var tasks = [];

// Function to render tasks in the taskTable tbody
function renderTasks() {
  const taskTable = document.getElementById("taskTable");
  const taskList = document.getElementById("taskList");

  // Clear existing table body
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const noItemsRow = taskList.insertRow(0);
    const noItemsCell = noItemsRow.insertCell(0);
    noItemsCell.colspan = 4;
    noItemsCell.textContent = "No items found";
  } else {
    tasks.forEach((task, index) => {
      const row = taskList.insertRow();
      const cellTask = row.insertCell(0);
      const cellTime = row.insertCell(1);
      const cellDate = row.insertCell(2);
      const cellActions = row.insertCell(3);

      cellTask.textContent = task.task;
      cellTime.textContent = task.time;
      cellDate.textContent = task.date;

      // Add a edit button for each task
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editTask(index);

      cellActions.appendChild(editButton);

      // Add a delete button for each task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteTask(index);

      cellActions.appendChild(deleteButton);
    });
  }
}

// Function to edit a task at a specific index
function editTask(index) {
  const updatedTask = prompt("Enter the updated task:");
  if (updatedTask !== null) {
    tasks[index].task = updatedTask;
    renderTasks();
  }
}

// Function to delete a task at a specific index
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to add new task
function addTask() {
  const newTaskInput = document.getElementById("newTask");
  const newTask = newTaskInput.value.trim();

  if (newTask !== "") {
    const currentDate = new Date();
    const task = {
      task: newTask,
      time: currentDate.toLocaleTimeString(),
      date: currentDate.toLocaleDateString(),
    };

    tasks.push(task);
    newTaskInput.value = ""; // Clear the input
    showError.innerHTML = "";
    renderTasks();
  } else {
    showError.innerHTML = "Please fill out the task 👌";
  }
}

// Function to add a task to the start
function addToStart() {
  const newTaskInput = document.getElementById("newTask");
  const newTask = prompt("Enter your new task");

  if (newTask !== "") {
    const currentDate = new Date();
    const task = {
      task: newTask,
      time: currentDate.toLocaleTimeString(),
      date: currentDate.toLocaleDateString(),
    };

    tasks.unshift(task);
    newTaskInput.value = "";
    renderTasks();
  }
}

// Function to delete the first task
function deleteFirst() {
  if (tasks.length > 0) {
    tasks.shift();
    renderTasks();
  }
}

// Function to delete the last task
function deleteLast() {
  if (tasks.length > 0) {
    tasks.pop();
    renderTasks();
  }
}

// Function to delete any task at a specific index
function deleteAny() {
  const index = prompt("Enter the index of the task to delete:");
  const parsedIndex = parseInt(index, 10);

  if (
    !isNaN(parsedIndex) &&
    parsedIndex >= 0 &&
    parsedIndex < tasks.length
  ) {
    tasks.splice(parsedIndex, 1);
    renderTasks();
  } else {
    alert("Invalid index. Please enter a valid index.");
  }
}

// Function to edit any task at a specific index
function editAny() {
  const index = prompt("Enter the index of the task to edit:");
  const updatedTask = prompt("Enter the updated task:");

  if (index !== null && updatedTask !== null) {
    const parsedIndex = parseInt(index, 10);
    if (
      !isNaN(parsedIndex) &&
      parsedIndex >= 0 &&
      parsedIndex < tasks.length
    ) {
      tasks[parsedIndex].task = updatedTask;
      renderTasks();
    } else {
      alert("Invalid index. Please enter a valid index.");
    }
  }
}

// Function to delete all tasks
function deleteAll() {
  tasks = [];
  renderTasks();
}

// Initial rendering of tasks
renderTasks();