let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = "player";

let xScore = 0;
let oScore = 0;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function setMode(selectedMode) {
    mode = selectedMode;
    restart();
}

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (checkWinner()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;

    if (mode === "computer" && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].innerText = player;
}

function computerMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    makeMove(randomIndex, "O");

    if (checkWinner()) return;

    currentPlayer = "X";
    statusText.innerText = "Player X's Turn";
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWin(pattern);

            statusText.innerText = `🎉 Player ${board[a]} Wins!`;
            gameActive = false;

            if (board[a] === "X") xScore++;
            else oScore++;

            updateScore();
            return true;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "😅 It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function highlightWin(pattern) {
    pattern.forEach(i => cells[i].classList.add("win"));
}

function updateScore() {
    document.getElementById("xScore").innerText = xScore;
    document.getElementById("oScore").innerText = oScore;
}

function restart() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    statusText.innerText = "Player X's Turn";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });
}