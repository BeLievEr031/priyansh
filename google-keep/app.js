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

        console.log(menuItems[i].innerText.includes("tes"));


        if (menuItems[i].innerText.includes("Notes")) {
            taskCont.innerHTML = "I am a task tab."
        } else if (menuItems[i].innerText.includes("Archive")) {
            taskCont.innerHTML = "I am a archive tab."
        } else if (menuItems[i].innerText.includes("Bin")) {
            taskCont.innerHTML = "I am a Bin tab."
        }
    })
}


const noteInput = document.querySelector(".note-box")

const taskArr = [];

noteInput.addEventListener("keydown", function (e) {


    if (e.key === "Enter") {
        const div = document.createElement("div")
        div.innerHTML = noteInput.value
        div.classList.add("task")

        const iconCont = document.createElement("div")
        iconCont.classList.add("icon-cont")

        const bin = document.createElement("span")
        bin.classList.add("material-symbols-outlined")
        // bin.classList.add("task-icon")
        bin.style.cursor = "pointer"
        bin.innerHTML = "delete"

        const archive = document.createElement("span")
        archive.classList.add("material-symbols-outlined")
        // archive.classList.add("task-icon")
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
    }
})



// Write code for displaying bin tasks.



// Write code for displaying archive tasks.