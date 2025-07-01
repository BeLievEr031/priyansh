const box1 = document.querySelector(".box-1")
const box2 = document.querySelector(".box-2")
const box3 = document.querySelector(".box-3")
let turn = "X";

box1.addEventListener("click", function () {
    box1.innerHTML = turn;
    if (turn === "X") {
        turn = "O";
    } else {
        turn = "X";
    }
})

box2.addEventListener("click", function () {
    box2.innerHTML = turn;
    if (turn === "X") {
        turn = "O";
    } else {
        turn = "X";
    }
})

box3.addEventListener("click", function () {
    box3.innerHTML = turn;
    if (turn === "X") {
        turn = "O";
    } else {
        turn = "X";
    }
})