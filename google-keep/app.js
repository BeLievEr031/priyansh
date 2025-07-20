const labels = document.querySelectorAll(".label")
const menuBtn = document.querySelector("#menu")
const sidebar = document.querySelector(".sidebar")
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


const noteInput = document.querySelector(".note-box")
const taskCont = document.querySelector(".tasks-cont")

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

        noteInput.value = ""
    }
})