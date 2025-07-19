// Load tasks from localStorage
window.onload = () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }

  renderTask(taskText, false);
  saveToLocalStorage();

  input.value = "";
}

function renderTask(text, isCompleted) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "task";
  if (isCompleted) li.classList.add("completed");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "completed✔";
  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    saveToLocalStorage();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit✏";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveToLocalStorage();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete🗑";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    saveToLocalStorage();
  };

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonsDiv);
  taskList.appendChild(li);
}

function saveToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList .task").forEach(task => {
    tasks.push({
      text: task.querySelector(".task-text").textContent,
      completed: task.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}