const boxes = document.querySelectorAll(".box")
const winner = document.querySelector(".winner")

let turn = "X";
let movesArr = ["", "", "", "", "", "", "", "", ""];

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {

        if (boxes[i].innerHTML === "") {
            boxes[i].innerHTML = turn
            movesArr[i] = turn;

            if (
                movesArr[0] !== "" && movesArr[1] !== "" && movesArr[2] !== "" &&
                movesArr[0] === movesArr[1] && movesArr[1] === movesArr[2]
            ) {
                winner.innerHTML = turn + " is winner."
            } else if (
                movesArr[3] !== "" && movesArr[4] !== "" && movesArr[5] !== "" &&
                movesArr[3] === movesArr[4] && movesArr[4] === movesArr[5]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            if (turn === "X") {
                turn = "O"
            } else {
                turn = "X"
            }
        }



    })
}
