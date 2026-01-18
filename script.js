let tasks = [];

/**
 * Adds a new task to the list
 */
async function addTask() {
    const title = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const due_date = document.getElementById("dueDate").value;

    if (!title) {
        alert("Task title required");
        return;
    }

    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            priority,
            due_date
        })
    });

    alert("Task added successfully");
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
async function loadTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const tasks = await res.json();
    console.log(tasks);
}

loadTasks();

