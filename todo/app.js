const input = document.querySelector("input")
const addBtn = document.querySelector("#add-btn")
const taskArea = document.querySelector(".task-area")

addBtn.addEventListener("click", function () {

    if (input.value === "") return;

    const taskDiv = document.createElement("div")
    taskDiv.classList.add("task");
    const taskPara = document.createElement("p")
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "delete"
    taskPara.innerHTML = input.value;

    taskDiv.appendChild(taskPara)
    taskDiv.appendChild(deleteBtn)

    taskArea.appendChild(taskDiv)

    input.value = "";

    deleteBtn.addEventListener("click", function () {
        taskDiv.remove()
    })
})


const noteInput = document.querySelector(".note-box")

input.addEventListener("keypress", function () {
    console.log("i am pressed.");

})