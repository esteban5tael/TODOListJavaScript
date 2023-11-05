// Define the app object with properties and methods
const app = {
    newTaskInput: document.querySelector("#new-task-input"),
    addTaskButton: document.querySelector("#add-task-button"),
    taskList: document.querySelector("#tasks-list"),
    tasks: [],
};

// Function to create a task object with an id, title, and completion status
const createTask = (title, isCompleted = false) => {
    return {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        title,
        isCompleted,
    };
};

// Function to add a task to the task list and create the corresponding HTML element
const addTaskToList = (task, taskList) => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
};

// Function to add a task to the app's task list
const addTask = (app) => {
    const newTaskTitle = app.newTaskInput.value;

    if (newTaskTitle.length > 3) {
        const newTask = createTask(newTaskTitle, false);
        app.tasks.push(newTask);

        addTaskToList(newTask, app.taskList);
        app.newTaskInput.value = "";
    } else {
        alert(
            "Type a Task: The task title should be at least 4 characters."
        );
        app.newTaskInput.focus();
    }
};

// Function to create an HTML element for a task
const createTaskElement = (task) => {
    const taskElement = document.createElement("li");
    const taskCheckBox = document.createElement("input");

    taskCheckBox.type = "checkbox";
    taskCheckBox.checked = task.isCompleted;

    taskCheckBox.addEventListener("change", () => {
        task.isCompleted = taskCheckBox.checked;
        taskText.classList.toggle("completed", task.isCompleted);
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.title;
    taskText.classList.toggle("completed", task.isCompleted);

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.textContent = "Delete";
    taskDeleteButton.className = "delete-button";

    taskDeleteButton.addEventListener("click", () => {
        taskElement.remove();
        const taskIndex = app.tasks.indexOf(task);
        if (taskIndex > -1) {
            app.tasks.splice(taskIndex, 1);
        }
    });

    taskElement.appendChild(taskCheckBox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskDeleteButton);

    return taskElement;
};

// Event listener for the add task button
app.addTaskButton.addEventListener("click", () => {
    addTask(app);
});

// Event listener for the Enter key in the new task input field
app.newTaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask(app);
    }
});
