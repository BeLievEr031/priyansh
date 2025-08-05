const canvasElem = document.querySelector("canvas")
const square = document.querySelector("#square")
const canvas = new fabric.Canvas(canvasElem, {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "black"
})

// has to fix
// canvas.defaultCursor = 'crosshair';

const iconsBtn = document.querySelectorAll(".floating-div *")
let prevSelectedElem = iconsBtn[0]
let isDrawing = false;
let isActive = false;
let shapeType = "";
const shapeArr = ["rectangle", "triangle", "circle", "line"]

for (let i = 0; i < iconsBtn.length; i++) {
    iconsBtn[i].addEventListener("click", function () {
        prevSelectedElem.classList.remove("active");
        iconsBtn[i].classList.add("active");

        const shape = iconsBtn[i].getAttribute("shape");
        shapeType = shape;
        // Reset any current selection
        canvas.discardActiveObject();

        if (shapeArr.includes(shape)) {
            canvas.defaultCursor = "crosshair"

            isActive = true;
            canvas.selection = false;

            // 🔒 Disable interactivity during shape drawing
            canvas.getObjects().forEach(obj => {
                obj.selectable = false;
                obj.evented = false;
            });

        } else {
            isActive = false;
            canvas.selection = true;

            canvas.defaultCursor = "default"

            // ✅ Restore full object interactivity
            canvas.getObjects().forEach(obj => {
                obj.selectable = true;
                obj.evented = true;
                obj.setCoords(); // 🔑 Required for interaction
            });

            // 🔑 Important: Allow target finding for object selection
            canvas.skipTargetFind = false;
        }

        // Refresh the canvas state
        canvas.requestRenderAll();

        prevSelectedElem = iconsBtn[i];
    });
}


let x1 = 0;
let y1 = 0;
let shape = null;

canvas.on("mouse:down", function () {

    if (!isActive) return;
    isDrawing = true;

    drawShape(shapeType);
})

canvas.on("mouse:move", function (o) {
    if (!shape || !isDrawing) return;

    const pointer = canvas.getPointer(o.e);
    const width = pointer.x - x1;
    const height = pointer.y - y1;

    shape.set({
        width: Math.abs(width),
        height: Math.abs(height),
        left: width < 0 ? pointer.x : x1,
        top: height < 0 ? pointer.y : y1,
    });

    canvas.renderAll();
})

canvas.on("mouse:up", function () {
    isDrawing = false;
    shape = null;
})


function drawShape(shapeType) {
    console.log(shapeType);

    if (shapeType === "rectangle") {
        const pos = canvas.getPointer()
        x1 = pos.x
        y1 = pos.y
        shape = new fabric.Rect({
            top: y1,
            left: x1,
            width: 1,
            height: 1,
            stroke: "white",
            fill: "transparent",
            cornerStyle: 'circle',
            cornerColor: 'green',
            cornerSize: 12,
            hasRotatingPoint: false
        })

    } else if (shapeType === "triangle") {
        const pos = canvas.getPointer()
        x1 = pos.x
        y1 = pos.y
        shape = new fabric.Triangle({
            top: y1,
            left: x1,
            width: 1,
            height: 1,
            stroke: "white",
            fill: "transparent",
            cornerStyle: 'circle',
            cornerColor: 'green',
            cornerSize: 12,
            hasRotatingPoint: false
        })
    }


    canvas.add(shape)
}
