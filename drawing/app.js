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
let selectedShape = "";

for (let i = 0; i < iconsBtn.length; i++) {
    iconsBtn[i].addEventListener("click", function () {
        prevSelectedElem.classList.remove("active");
        iconsBtn[i].classList.add("active");

        selectedShape = iconsBtn[i].getAttribute("shape")
        canvas.discardActiveObject();

        canvas.getObjects().forEach(obj => {
            obj.selectable = false;
            obj.evented = false;
        });

        if (selectedShape === "rectangle") {
            // rectangle draw mode open
            active = true;
            canvas.selection = false;
        } else if (selectedShape === "triangle") {
            active = true;
            canvas.selection = false;
        } else if (selectedShape === "circle") {
            active = true;
            canvas.selection = false;
        } else if (selectedShape === "pencil") {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = "white";

        }
        else {
            active = false;
            canvas.selection = true;
            canvas.isDrawingMode = false;
            const objectArr = canvas.getObjects();

            for (let j = 0; j < objectArr.length; j++) {
                objectArr[j].selectable = true;
                objectArr[j].evented = true;
                objectArr[j].setCoords();
            }

        }

        canvas.renderAll();
        prevSelectedElem = iconsBtn[i];
    });
}

let startX = 0;
let startY = 0;
let currShape = null;

canvas.on("mouse:down", function (o) {
    if (active === false) return;

    const pointer = canvas.getPointer(o.e);
    startX = pointer.x;
    startY = pointer.y;

    console.log(selectedShape);

    if (selectedShape === "rectangle") {

        currShape = new fabric.Rect({
            top: startY,
            left: startX,
            width: 1,
            height: 1,
            stroke: "white",
            fill: "transparent",
        })
    } else if (selectedShape === "triangle") {
        currShape = new fabric.Triangle({
            top: startY,
            left: startX,
            width: 1,
            height: 1,
            stroke: "white",
            fill: "transparent",
        })
    } else if (selectedShape === "circle") {
        let x1 = pointer.x;
        let y1 = pointer.y;

        currShape = new fabric.Ellipse({
            left: x1,
            top: y1,
            originX: 'center',
            originY: 'center',
            rx: 1,
            ry: 1,
            stroke: 'white',
            fill: 'transparent',
            strokeWidth: 2,
        });
    }

    canvas.add(currShape)
})

canvas.on("mouse:move", function (o) {
    if (currShape === null) return;

    const pointer = canvas.getPointer(o.e);
    const x2 = pointer.x;
    const y2 = pointer.y;

    const newWidth = x2 - startX;
    const newHeight = y2 - startY;

    if (selectedShape === "rectangle" || selectedShape === "triangle") {
        currShape.set({
            left: newWidth < 0 ? x2 : startX,
            top: newHeight < 0 ? y2 : startY,
            width: Math.abs(newWidth),
            height: Math.abs(newHeight)
        })
    } else if (selectedShape === "circle") {
        const rx = Math.abs(startX - x2) / 2;
        const ry = Math.abs(startY - y2) / 2;

        currShape.set({
            rx,
            ry,
            left: (startX + x2) / 2,
            top: (startY + y2) / 2
        });
    }

    canvas.renderAll();
})

canvas.on("mouse:up", function () {
    currShape = null;
})

const resultColor = document.querySelector("#selected-stroke")

canvas.on("selection:created", function (event) {
    // console.log("i am selected.", canvas.getActiveObject());
    const selectedShape = canvas.getActiveObject();
    console.log(selectedShape.stroke);
    resultColor.style.backgroundColor = selectedShape.stroke

})

canvas.on("selection:updated", function (event) {
    // console.log("i am update event.", canvas.getActiveObject());
    const selectedShape = canvas.getActiveObject();
    console.log(selectedShape.stroke);
    resultColor.style.backgroundColor = selectedShape.stroke

})


const colorBoxes = document.querySelectorAll(".colors > .box")


for (let i = 0; i < colorBoxes.length; i++) {
    colorBoxes[i].addEventListener("click", function () {
        const selectedColorStyle = window.getComputedStyle(colorBoxes[i])
        resultColor.style.backgroundColor = selectedColorStyle.backgroundColor;

        const selectedShape = canvas.getActiveObject()
        // null,undefined ==> false

        if (selectedShape !== undefined) {

            selectedShape.set({
                stroke: selectedColorStyle.backgroundColor,
            })
            canvas.renderAll()

        }

    })
}