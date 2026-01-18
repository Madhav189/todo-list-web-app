const API_URL = "https://render.com/docs/web-services#port-binding";

/**
 * Load tasks from backend
 */
async function loadTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="text-decoration:${task.status === "COMPLETED" ? "line-through" : "none"}">
                ${task.title} (${task.priority})
            </span>
            <div>
                <button onclick="editTask(${task.id})">✏️</button>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;

        list.appendChild(li);
    });
}

/**
 * Add task
 */
async function addTask() {
    const title = document.getElementById("taskInput").value;
    const priority = document.getElementById("priority").value;
    const due_date = document.getElementById("dueDate").value;

    await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority, due_date })
    });

    loadTasks();
}

/**
 * Edit task (simple prompt)
 */
async function editTask(id) {
    const newTitle = prompt("Enter new task title");

    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: newTitle,
            priority: "MEDIUM",
            status: "PENDING"
        })
    });

    loadTasks();
}

/**
 * Delete task
 */
async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
