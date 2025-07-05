let Showing = document.querySelector(".ShowingTurn")
const boxes = document.querySelectorAll(".box")
const winner = document.querySelector(".winner")
let Reset = document.querySelector(".ResetButton")

let turn = "X";
let movesArr = ["", "", "", "", "", "", "", "", ""];
Showing.innerHTML = "It is " + turn + "'s turn"

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        console.log(45);

        if (boxes[i].innerHTML === "") {
            boxes[i].innerHTML = turn
            movesArr[i] = turn;

            if (
                movesArr[0] !== "" && movesArr[1] !== "" && movesArr[2] !== "" &&
                movesArr[0] === movesArr[1] && movesArr[1] === movesArr[2]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[3] !== "" && movesArr[4] !== "" && movesArr[5] !== "" &&
                movesArr[3] === movesArr[4] && movesArr[4] === movesArr[5]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[6] !== "" && movesArr[7] !== "" && movesArr[8] !== "" &&
                movesArr[6] === movesArr[7] && movesArr[7] === movesArr[8]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[0] !== "" && movesArr[3] !== "" && movesArr[6] !== "" &&
                movesArr[0] === movesArr[3] && movesArr[3] === movesArr[6]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[1] !== "" && movesArr[4] !== "" && movesArr[7] !== "" &&
                movesArr[1] === movesArr[4] && movesArr[4] === movesArr[7]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[2] !== "" && movesArr[5] !== "" && movesArr[8] !== "" &&
                movesArr[2] === movesArr[5] && movesArr[5] === movesArr[8]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[0] !== "" && movesArr[4] !== "" && movesArr[8] !== "" &&
                movesArr[0] === movesArr[4] && movesArr[4] === movesArr[8]
            ) {
                winner.innerHTML = turn + " is winner."
            }

            else if (
                movesArr[2] !== "" && movesArr[4] !== "" && movesArr[6] !== "" &&
                movesArr[2] === movesArr[4] && movesArr[4] === movesArr[6]
            ) {
                winner.innerHTML = turn + " is winner."
            }


            if (turn === "X") {
                turn = "O"
                Showing.innerHTML = "It is " + turn + "'s turn"

            } else {
                turn = "X"
                Showing.innerHTML = "It is " + turn + "'s turn"
            }
        }

    })
}

Reset.addEventListener("click", function () {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        movesArr = ["", "", "", "", "", "", "", "", ""];
        turn = "X";
        winner.innerHTML = "";
    }
})