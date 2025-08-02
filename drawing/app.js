const canvasElem = document.querySelector("canvas")

const canvas = new fabric.Canvas(canvasElem, {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "black"
})

// has to fix
// canvas.defaultCursor = 'crosshair';


const iconsBtn = document.querySelectorAll(".floating-div *")
let prevSelectedElem = iconsBtn[0]

for (let i = 0; i < iconsBtn.length; i++) {
    iconsBtn[i].addEventListener("click", function () {
        prevSelectedElem.classList.remove("active")
        iconsBtn[i].classList.add("active")
        prevSelectedElem = iconsBtn[i]
    })
}

let x1 = 0;
let y1 = 0;

canvas.on("mouse:down", function () {

    const pos = canvas.getPointer()
    x1 = pos.x
    y1 = pos.y

    const rect = new fabric.Rect({
        top: y1,
        left: x1,
        width: 100,
        height: 100,
        stroke: "white",
    })

    canvas.add(rect)
})

canvas.on("mouse:move", function () {
    // console.log(canvas.getPointer());
})

canvas.on("mouse:up", function () {
    console.log("i am x2 & y2", canvas.getPointer());
})
