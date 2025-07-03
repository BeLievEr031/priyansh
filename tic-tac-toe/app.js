const boxes = document.querySelectorAll(".box")
let turn = "X";
let movesArr = [];

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function () {
        boxes[i].innerHTML = turn
        movesArr[i] = turn;

        if (movesArr[0] === movesArr[1] && movesArr[1] === movesArr[2]) {
            console.log(turn + " is winner.");
        } else if (movesArr[3] === movesArr[4] && movesArr[4] === movesArr[5]) {
            console.log(turn + " is winner.");
        }

        if (turn === "X") {
            turn = "O"
        } else {
            turn = "X"
        }

    })
}
