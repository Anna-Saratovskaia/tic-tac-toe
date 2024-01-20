let newGameBtn = document.querySelector("button");
let winnerMessage = document.querySelector(".winner");
let boardCells = Array.from(document.querySelectorAll(".cell"));

let cellContent = Array(9).fill(null);
let o_text = "O";
let x_text = "X";
let currentPlayer = x_text;

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

let startGame = () => {
  boardCells.forEach((cell) => cell.addEventListener("click", cellClicked));
};

function cellClicked(e) {
  const id = e.target.id;

  if (!cellContent[id]) {
    cellContent[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playHasWon()) {
      winnerMessage = currentPlayer;
      let winning_blocks = playHasWon();
      winning_blocks.map((cell) => {
        boardCells[cell].style.backgroundColor = winnerIndicator;
      });
      return;
    }
    currentPlayer = currentPlayer === x_text ? o_text : x_text;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;
    if (
      cellContent[a] &&
      cellContent[a] === cellContent[b] &&
      cellContent[a] === cellContent[c]
    )
      return [a, b, c];
  }
  return false;
}

newGameBtn.addEventListener("click", restart);

function restart() {
  currentPlayer = x_text;
  boardCells.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  cellContent.fill(null);
  winnerMessage = "";
}

startGame();
