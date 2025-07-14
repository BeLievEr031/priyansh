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