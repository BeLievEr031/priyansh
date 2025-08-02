const canvasElem = document.querySelector("canvas")

const canvas = new fabric.Canvas(canvasElem, {
    width: window.innerWidth,
    height: window.innerHeight
})

const iconsBtn = document.querySelectorAll(".floating-div *")
let prevSelectedElem = iconsBtn[0]

for (let i = 0; i < iconsBtn.length; i++) {
    iconsBtn[i].addEventListener("click", function () {
        prevSelectedElem.classList.remove("active")
        iconsBtn[i].classList.add("active")
        prevSelectedElem = iconsBtn[i]
    })
}