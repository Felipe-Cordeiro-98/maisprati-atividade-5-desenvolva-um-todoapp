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

/* add tasks */

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

    let buttonRemove = document.createElement("button");
    buttonRemove.classList.add("btn", "btn-danger", "btn-sm");
    buttonRemove.textContent = "Remover";

    buttonRemove.addEventListener("click", () => {
        containerTask.remove();
        updateTaskCount();
    });

    containerTask.appendChild(checkbox);
    containerTask.appendChild(inputTask);
    containerTask.appendChild(buttonRemove);

    let container = document.querySelector(".container-tasks");

    container.prepend(containerTask);
    task.value = "";
    updateTaskCount();
});

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
