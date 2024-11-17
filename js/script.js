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
