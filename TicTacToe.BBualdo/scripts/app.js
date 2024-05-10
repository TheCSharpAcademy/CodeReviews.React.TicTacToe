// Elements
const todoListContainer = document.querySelector(".todo-list-container");
const checkToAddTask = document.getElementById("add-task");
const inputAddTask = document.getElementById("input-add-task");
const categoryButtons = document.querySelectorAll(".category-button");
const clearButton = document.querySelector(".clear-completed-button");
const itemsCountElement = document.getElementById("items-count");
let currentFilter = "all";

let todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    id: 1,
    name: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: 2,
    name: "Jog around the park 3x",
    completed: false,
  },
  {
    id: 3,
    name: "10 minutes meditation",
    completed: false,
  },
  {
    id: 4,
    name: "Read for 1 hour",
    completed: false,
  },
  {
    id: 5,
    name: "Pick up groceries",
    completed: false,
  },
  {
    id: 6,
    name: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
];

renderTodoList(todoList);

function renderTodoList(list) {
  const filteredList = list || todoList; // 1
  todoListContainer.innerHTML = "";

  filteredList.forEach((task) => {
    const html = `
      <div class="todo-list ${
        task.completed ? "completed" : ""
      }" data-task-id="${task.id}">
        <input name="completed" class="checkbox" type="checkbox" ${
          task.completed ? "checked" : ""
        }>
        <div class="todo-content">
          <p>${task.name}</p>
          <button class="delete-button"></button>
        </div>
      </div>
    `; //2

    todoListContainer.innerHTML += html; //Insert the html
  });

  updateItemsLeftCounter(filteredList); // Update counter
}

// Add Todo logic
function addTask(name) {
  const newTask = {
    id: todoList.length + 1,
    name,
    completed: false,
  };

  todoList.push(newTask);
  renderTodoList();
  inputAddTask.value = "";

  setTimeout(() => {
    checkToAddTask.checked = false;
  }, 200);
}

function filterTask(filter) {
  const tasksCopy = [...todoList];
  const taskFiltered = tasksCopy.filter((task) =>
    filter === "all"
      ? task
      : filter === "completed"
      ? task.completed
      : !task.completed
  );

  currentFilter = filter;
  renderTodoList(taskFiltered);
}

function updateTask(taskId) {
  todoList = todoList.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  filterTask(currentFilter);
}

function deleteTask(taskId) {
  todoList = todoList.filter((task) => task.id !== taskId);
  filterTask(currentFilter);
}

function clearCompletedTasks() {
  todoList = todoList.filter((task) => !task.completed);
  filterTask(currentFilter);
}

function updateItemsLeftCounter(list) {
  const remainingItemCount = list.filter((task) => !task.completed).length;
  const label = currentFilter === "all" ? "left" : currentFilter;

  itemsCountElement.textContent = `${remainingItemCount} items ${label}`;
}

checkToAddTask.addEventListener("click", (e) => {
  const name = inputAddTask.value.trim(); //Value of the input without spaces
  if (name === "") {
    //If name is an empty string, we prevent the input from being checked
    e.preventDefault();
  } else {
    //Otherwise add the new task
    addTask(name);
  }
});

inputAddTask.addEventListener("keydown", (e) => {
  const name = inputAddTask.value.trim();
  if (e.key === "Enter" && name !== "") {
    // In the input if key Enter is pressed and name is not equal to an empty string add the new task
    checkToAddTask.checked = true;
    addTask(name);
  }
});

clearButton.addEventListener("click", clearCompletedTasks);

todoListContainer.addEventListener("click", (event) => {
  // 1
  const deleteButton = event.target.closest(".delete-button");
  const toggleCompleted = event.target.closest(".checkbox");

  if (deleteButton) {
    // 2
    const taskId = parseInt(deleteButton.closest(".todo-list").dataset.taskId);
    deleteTask(taskId);
  }

  if (toggleCompleted) {
    const taskId = parseInt(
      toggleCompleted.closest(".todo-list").dataset.taskId
    );
    updateTask(taskId);
  }
});

categoryButtons.forEach((button) =>
  button.addEventListener("click", () => {
    //Find an element with the class "is-toggled"
    const toggled = document.querySelector(".is-toggled");

    // If there is, remove the class is toggled
    if (toggled) toggled.classList.remove("is-toggled");

    // And add it to the button pressed
    button.classList.add("is-toggled");

    // Get the name of the filter, remove the trailing spaces and change to lowercase
    const filter = button.textContent.trim().toLowerCase();

    // Call the filterTask function with the name of the filter
    filterTask(filter);
  })
);
