let tasks = [];

/**
 * Adds a new task to the list
 */
function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (title === "") return alert("Task cannot be empty");

    tasks.push({ title, status: "PENDING" });
    input.value = "";

    renderTasks();
}

/**
 * Deletes a task
 */
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

/**
 * Renders tasks on UI
 */
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}
