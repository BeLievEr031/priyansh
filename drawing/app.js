const canvasElem = document.querySelector("canvas")
const square = document.querySelector("#square")
const canvas = new fabric.Canvas(canvasElem, {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "black"
})

const iconsBtn = document.querySelectorAll(".floating-div *")
let prevSelectedElem = iconsBtn[0]
let active = false;

for (let i = 0; i < iconsBtn.length; i++) {
    iconsBtn[i].addEventListener("click", function () {
        prevSelectedElem.classList.remove("active");
        iconsBtn[i].classList.add("active");

        const shape = iconsBtn[i].getAttribute("shape")
        console.log(shape);

        if (shape === "rectangle") {
            // canvas.selection = false;
            // rectangle draw mode open
            active = true;
            // canvas.selection = false;

            canvas.getObjects().forEach(obj => {
                obj.selectable = false;
                obj.evented = false;
            });
        }

        prevSelectedElem = iconsBtn[i];
    });
}

let startX = 0;
let startY = 0;
let currShape = null;

canvas.on("mouse:down", function () {
    if (active === false) return;

    const pointer = canvas.getPointer();
    startX = pointer.x;
    startY = pointer.y;

    currShape = new fabric.Rect({
        top: startY,
        left: startX,
        width: 1,
        height: 1,
        stroke: "white",
        fill: "transparent",
    })

    canvas.add(currShape)
})

canvas.on("mouse:move", function () {
    if (currShape === null) return;

    const pointer = canvas.getPointer();
    const x2 = pointer.x;
    const y2 = pointer.y;

    const newWidth = x2 - startX;
    const newHeight = y2 - startY;

    currShape.set({
        left: startX > x2 ? x2 : startX,
        top: startY > y2 ? y2 : startY,
        width: Math.abs(newWidth),
        height: Math.abs(newHeight)
    })

})

canvas.on("mouse:up", function () {
    currShape = null;
})