// theme

function backgroundChange(index) {
    const dark = document.querySelectorAll(".dark");
    const light = document.querySelectorAll(".light");

    document.body.classList.remove("dark-theme", "light-theme");

    light.forEach((element) => {
        element.style.display = "none";
    });

    dark.forEach((element) => {
        element.style.display = "none";
    });

    if (index === 1) {
        document.body.classList.add("dark-theme");
        dark.forEach((element) => {
            element.style.display = "block";
        });

        localStorage.setItem("theme", 1);
    }

    if (index === 2) {
        document.body.classList.add("light-theme");
        light.forEach((element) => {
            element.style.display = "block";
        });

        localStorage.setItem("theme", 2);
    }
}

const theme = localStorage.getItem("theme");

if (theme === "1") {
    backgroundChange(1);
} else if (theme === "2") {
    backgroundChange(2);
}

// add tasks

const button = document.querySelector(".button-submit");

button.addEventListener("click", () => {
    let task = document.querySelector("#task-input");

    let containerTask = document.createElement("div");
    containerTask.classList.add("task");

    let checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");

    let inputTask = document.createElement("input");
    inputTask.classList.add("input-task");
    inputTask.setAttribute("type", "text");
    inputTask.setAttribute("value", task.value);
    inputTask.setAttribute("readonly", true);

    inputTask.onclick = () => {
        inputTask.removeAttribute("readonly");
        inputTask.focus();
    };

    checkbox.onclick = () => {
        checkbox.classList.toggle("completed");
        inputTask.classList.toggle("completed");
        containerTask.classList.toggle("completed");
        saveTasks();
    };

    let buttonRemove = document.createElement("button");
    buttonRemove.classList.add("btn", "btn-danger", "btn-sm");
    buttonRemove.textContent = "Remover";

    buttonRemove.addEventListener("click", () => {
        containerTask.remove();
        updateTaskCount();
        saveTasks();
    });

    containerTask.appendChild(checkbox);
    containerTask.appendChild(inputTask);
    containerTask.appendChild(buttonRemove);

    let container = document.querySelector(".container-tasks");

    container.prepend(containerTask);
    task.value = "";
    updateTaskCount();
    saveTasks();
});

// updateTaskCount

function updateTaskCount() {
    const infoContainer = document.querySelector(".info-container");
    let totalTasks = document.querySelectorAll(".task").length;

    let total = document.querySelector("#total-tasks");

    if (!total) {
        total = document.createElement("span");
        total.id = "total-tasks";
        infoContainer.prepend(total);
    }
    if (totalTasks < 1) {
        total.remove();
    } else {
        let text = totalTasks < 2 ? "tarefa" : "tarefas";
        total.innerText = `${totalTasks} ${text}`;
    }
}

// filter

let filters = document.querySelectorAll(".filter");
let all = document.querySelector(".all");

filters.forEach((filter) => {
    if (!filter.classList.contains("text-primary")) {
        all.classList.add("text-primary");
    }
});

function filter(index) {
    let active = document.querySelector(".active");
    let completed = document.querySelector(".filter.completed");
    let tasks = document.querySelectorAll(".task");

    all.classList.remove("text-primary");
    active.classList.remove("text-primary");
    completed.classList.remove("text-primary");

    if (index === 0) {
        all.classList.add("text-primary");
        tasks.forEach((element) => {
            element.style.display = "flex";
        });
    }

    if (index === 1) {
        active.classList.add("text-primary");
        tasks.forEach((element) => {
            if (!element.classList.contains("completed")) {
                element.style.display = "flex";
            } else {
                element.style.display = "none";
            }
        });
    }

    if (index === 2) {
        completed.classList.add("text-primary");
        tasks.forEach((element) => {
            if (element.classList.contains("completed")) {
                element.style.display = "flex";
            } else {
                element.style.display = "none";
            }
        });
    }
}

// clear completed

function clearCompleted() {
    let tasks = document.querySelectorAll(".task.completed");

    tasks.forEach((element) => {
        element.remove();
        updateTaskCount();
        saveTasks();
    });
}

// saveTasks

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".task");

    taskElements.forEach((taskElement) => {
        const inputTask = taskElement.querySelector(".input-task");
        const isCompleted = taskElement.classList.contains("completed");
        tasks.push({
            text: inputTask.value,
            completed: isCompleted,
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// loadTasks

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
        savedTasks.forEach((task) => {
            const containerTask = document.createElement("div");
            containerTask.classList.add("task");

            const inputTask = document.createElement("input");
            inputTask.classList.add("input-task");
            inputTask.setAttribute("type", "text");
            inputTask.setAttribute("value", task.text);
            inputTask.setAttribute("readonly", true);
            inputTask.onclick = () => {
                inputTask.removeAttribute("readonly");
                inputTask.focus();
            };

            const checkbox = document.createElement("div");
            checkbox.classList.add("checkbox");

            if (task.completed) {
                containerTask.classList.add("completed");
                checkbox.classList.add("completed");
                inputTask.classList.add("completed");
            }

            checkbox.onclick = () => {
                checkbox.classList.toggle("completed");
                containerTask.classList.toggle("completed");
                inputTask.classList.toggle("completed");
                saveTasks();
            };

            const buttonRemove = document.createElement("button");
            buttonRemove.classList.add("btn", "btn-danger", "btn-sm");
            buttonRemove.textContent = "Remover";
            buttonRemove.addEventListener("click", () => {
                containerTask.remove();
                updateTaskCount();
                saveTasks();
            });

            containerTask.appendChild(checkbox);
            containerTask.appendChild(inputTask);
            containerTask.appendChild(buttonRemove);

            let container = document.querySelector(".container-tasks");
            container.prepend(containerTask);
        });
    }
    updateTaskCount();
}

window.onload = function () {
    loadTasks();
};
