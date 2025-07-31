const labels = document.querySelectorAll(".label")
const menuBtn = document.querySelector("#menu")
const sidebar = document.querySelector(".sidebar")
const taskCont = document.querySelector(".tasks-cont")

let flag = false;

menuBtn.addEventListener("click", function () {
    for (let i = 0; i < labels.length; i++) {

        if (flag === false) {
            labels[i].classList.add("hide-label")
        } else {
            labels[i].classList.remove("hide-label")
        }

    }

    if (flag === false) {
        sidebar.classList.add("make-smaller-sidebar")
    } else {
        sidebar.classList.remove("make-smaller-sidebar")
    }

    flag = !flag;
})

// Managing menu item bg-color
const menuItems = document.querySelectorAll(".menu-item")
let prevElem = menuItems[0]

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function () {
        prevElem.classList.remove("active")
        menuItems[i].classList.add("active")
        prevElem = menuItems[i]

        if (menuItems[i].innerText.includes("Notes")) {
            showNotesTask();
        } else if (menuItems[i].innerText.includes("Archive")) {
            taskCont.innerHTML = "I am a archive tab."
        } else if (menuItems[i].innerText.includes("Bin")) {
            taskCont.innerHTML = ""
            showBinTask();
        }
    })
}


const noteInput = document.querySelector(".note-box")

let taskArr = [];
let idx = 0;
noteInput.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        const div = document.createElement("div")
        div.innerHTML = noteInput.value
        div.classList.add("task")

        const iconCont = document.createElement("div")
        iconCont.classList.add("icon-cont")

        const bin = document.createElement("span")
        bin.classList.add("material-symbols-outlined")
        bin.style.cursor = "pointer"
        bin.innerHTML = "delete"
        bin.setAttribute("idx", idx)

        const archive = document.createElement("span")
        archive.classList.add("material-symbols-outlined")
        archive.style.cursor = "pointer"
        archive.innerHTML = "archive"

        iconCont.append(bin)
        iconCont.append(archive)

        div.append(iconCont)

        taskCont.append(div)

        const obj = {
            task: noteInput.value,
            isNote: true,
            isBin: false,
            isArchive: false,
            bgColor: "transparent"
        }

        taskArr.push(obj)

        noteInput.value = ""
        noteInput.value = ""
        idx = idx + 1;

        localStorage.setItem("tasks", JSON.stringify(taskArr))

        bin.addEventListener("click", function () {
            const idx = bin.getAttribute("idx")

            taskArr[Number(idx)].isBin = true;
            taskArr[Number(idx)].isArchive = false;
            taskArr[Number(idx)].isNote = false;

            localStorage.setItem("tasks", JSON.stringify(taskArr))

            div.remove();


        })
    }
})

// Code for displaying Notes

function showNotesTask() {
    taskCont.innerHTML = "";
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].isNote === true) {
            const div = document.createElement("div")
            div.innerHTML = taskArr[i].task
            div.classList.add("task")

            const iconCont = document.createElement("div")
            iconCont.classList.add("icon-cont")

            const bin = document.createElement("span")
            bin.classList.add("material-symbols-outlined")
            bin.style.cursor = "pointer"
            bin.innerHTML = "delete"
            bin.setAttribute("idx", i)

            const archive = document.createElement("span")
            archive.classList.add("material-symbols-outlined")
            archive.style.cursor = "pointer"
            archive.innerHTML = "archive"

            iconCont.append(bin)
            iconCont.append(archive)

            div.append(iconCont)

            taskCont.append(div)

            bin.addEventListener("click", function () {
                const idx = bin.getAttribute("idx")

                taskArr[Number(idx)].isBin = true;
                taskArr[Number(idx)].isArchive = false;
                taskArr[Number(idx)].isNote = false;

                div.remove();
            })
        }
    }
}


// Write code for displaying bin tasks.
function showBinTask() {
    for (let i = 0; i < taskArr.length; i++) {
        if (taskArr[i].isBin === true) {
            const div = document.createElement("div")
            div.innerHTML = taskArr[i].task
            div.classList.add("task")


            const restore = document.createElement("span")
            restore.classList.add("material-symbols-outlined")
            restore.style.cursor = "pointer"
            restore.innerHTML = "restore_from_trash"
            restore.setAttribute("idx", i)

            div.append(restore)
            taskCont.append(div)

            restore.addEventListener("click", function () {

                taskArr[i].isNote = true
                taskArr[i].isBin = false
                taskArr[i].isArchive = false

                div.remove();
            })
        }
    }
}


// code for displaying the localstorage data

function loadFromLocalStorage() {
    const tasks = localStorage.getItem("tasks")
    console.log(tasks);

    if (tasks) {
        taskArr = JSON.parse(tasks)
        showNotesTask()
    }
}

loadFromLocalStorage()