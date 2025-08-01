const rectBtn = document.querySelector("#rect")
const circleBtn = document.querySelector("#circle")
const triangleBtn = document.querySelector("#triangle")
const deleteBtn = document.querySelector("#delete")
const canvasElem = document.querySelector("canvas")


const canvas = new fabric.Canvas(canvasElem, {
    width: 800,
    height: 500
})

rectBtn.addEventListener("click", function () {

    const rect = new fabric.Rect({
        left: 50,
        top: 50,
        stroke: "black",
        width: 50,
        height: 50,
        fill: "transparent"
    })

    canvas.add(rect)

})


circleBtn.addEventListener("click", function () {
    const circle = new fabric.Circle({
        left: 75,
        top: 75,
        radius: 35,
        fill: "transparent",
        stroke: "green"
    })

    canvas.add(circle)
})

triangleBtn.addEventListener("click", function () {
    const triangle = new fabric.Triangle({
        left: 100,
        top: 100,
        width: 100,
        height: 50,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 5
    })

    canvas.add(triangle)
})

deleteBtn.addEventListener("click", function () {
    const selectedShape = canvas.getActiveObject()
    canvas.remove(selectedShape)
})