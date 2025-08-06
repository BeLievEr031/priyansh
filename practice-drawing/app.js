const canvasElem = document.querySelector("canvas")
const square = document.querySelector("#square")
const canvas = new fabric.Canvas(canvasElem, {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "black"
})

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
        canvas.isDrawingMode = false;

        if (shapeArr.includes(shape)) {
            canvas.isDrawingMode = false;
            canvas.defaultCursor = "crosshair"

            isActive = true;
            canvas.selection = false;

            // 🔒 Disable interactivity during shape drawing
            canvas.getObjects().forEach(obj => {
                obj.selectable = false;
                obj.evented = false;
            });

        } else if (shape === "pencil") {
            isActive = false;
            canvas.selection = false;
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.color = 'blue'
            canvas.freeDrawingBrush.width = 5

            canvas.skipTargetFind = true;
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

    if (shapeType === "rectangle" || shapeType === "triangle") {

        shape.set({
            width: Math.abs(width),
            height: Math.abs(height),
            left: width < 0 ? pointer.x : x1,
            top: height < 0 ? pointer.y : y1,
        });
    } else if (shapeType === "circle") {
        const rx = Math.abs(pointer.x - x1) / 2;
        const ry = Math.abs(pointer.y - y1) / 2;

        shape.set({
            rx,
            ry,
            left: (pointer.x + x1) / 2,
            top: (pointer.y + y1) / 2
        });
    }

    canvas.renderAll();
})

canvas.on("mouse:up", function () {
    isDrawing = false;
    shape = null;
})


function drawShape(shapeType) {
    const pos = canvas.getPointer()

    if (shapeType === "rectangle") {
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
    } else if (shapeType === "circle") {
        x1 = pos.x
        y1 = pos.y

        shape = new fabric.Ellipse({
            left: x1,
            top: y1,
            originX: 'center',
            originY: 'center',
            rx: 1,
            ry: 1,
            stroke: 'red',
            fill: 'transparent',
            strokeWidth: 2,
        });
    }

    canvas.add(shape)
}
