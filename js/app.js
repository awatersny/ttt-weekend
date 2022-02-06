/*-------------------------------- Constants --------------------------------*/
// 4) Define the required constants:

	// 4.1) Define the 8 possible winning combinations as an array of arrays.
	  // Each array will contain three indexes of the board that make a winner if they hold the same player value. 
		// If you are having trouble with this step, feel free to check out the winningCombos array in the solution code. 
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let squares, turn, winner;
//For styling logic
let winCombo;

/*------------------------ Cached Element References ------------------------*/
const board = document.querySelector(".board");
const message = document.getElementById("message");
const boardSqs = document.querySelectorAll(".square");
const replay = document.getElementById("replay");

/*----------------------------- Event Listeners -----------------------------*/
board.addEventListener("click", handleClick);
replay.addEventListener("click", init)

/*-------------------------------- Functions --------------------------------*/

function init(){
  // 3.2.1) Initialize the board array to 9 nulls to represent empty squares.
    squares = [null, null, null, null, null, null, null, null, null];
  // 3.2.2) Initialize whose turn it is to 1 (player 'X'). 
    turn = 1;
  // 3.2.3) Initialize the winner variable to null.
    winner = null;
  // 3.2.4) Render those state variables to the page by calling a render function.
  render();
  replay.setAttribute("hidden", true)
}

function render() {
  // 3.3.1) Loop over the board array (which represents the squares on the page), and for each iteration:
  squares.forEach((square, idx) => {
    // 3.3.1.2) Style that square however you wish dependant on the value contained in the current cell being iterated over (-1, 1, or null)
    if (square === 1) {
      boardSqs[idx].style.color = "#f00";
      boardSqs[idx].textContent = "X";
    } else if (square === -1) {
      boardSqs[idx].style.color = "#77f";
      boardSqs[idx].textContent = "O";
    } else {
      boardSqs[idx].style.color = "#fff";
      boardSqs[idx].textContent = null;
    }
    // 3.3.2) Render a message reflecting the currrent game state:
    // 3.3.2.1) If winner has a value other than null (game still in progress), render whose turn it is.
    if (!winner) {
      if (turn === 1) {
        message.textContent = `It's X's turn!`;
        message.style.textShadow = "0 5px 10px #f00";
      } else if (turn === -1){
        message.textContent = `It's O's turn!`;
        message.style.textShadow = "0 5px 10px #77f";
      }
    } else {
      if (winner === 1) {
        renderWin('X');
      } else if (winner === -1) {
        renderWin('O');
      } else {
        message.textContent = `It's a tie!`;
        message.style.textShadow = "0 5px 10px #0f0";
      }
    }
  });
}

function handleClick(evt) {
	// 5.3) If winner is not null, immediately return because the game is over.
  if (winner) {
    return;
  }
	// 5.2) If the board has a value at the index, immediately return because that square is already taken.
  if (squares[parseInt(evt.target.id[2], 10)]) {
    return;
  }
	// 5.4) Update the board array at the index with the value of turn.
  squares[parseInt(evt.target.id[2], 10)] = turn;
	// 5.5) Change the turn by multiplying turn by -1 (this flips a 1 to -1, and vice-versa).
  turn = turn === 1 ? -1 : 1;
  // 5.6) Set the winner variable if there's a winner by calling a new function: getWinner.
  setWinner();
  // console.log(winner);
// 5.7) All state has been updated, so render the state to the page (step 3.3).
  render();
  replay.removeAttribute("hidden");
}

function setWinner() {
  // 5.6.1.1) Loop through the each of the winning combination arrays defined.
  winningCombos.forEach(combo => {
    // 5.6.1.2) Total up the three board positions using the three indexes in the current combo.
    // 5.6.1.3) Convert the total to an absolute value (convert any negative total to positive).
    // 5.6.1.4) If the total equals 3, we have a winner! Set the winner variable to the board's value at the index specified by the first index of that winning combination's array by returning that value.
    if (Math.abs(squares[combo[0]] + squares[combo[1]] + squares[combo[2]]) === 3) {
      winner = squares[combo[0]];
      winCombo = combo;
    }
  });

  // 5.6.3) Next, If there's no winner, check if there's a tie:
  if (squares.every(square => square) && !winner) {
    // 5.6.4) Set the winner varible to "T" if there are no more nulls in the board array by returning the string "T".
    winner = 'T';
  }
  // 5.6.5) Otherwise return null.
  return null;
}

function renderWin( victor ) {
  message.textContent = `${victor} wins!`;
  message.style.textShadow = "0 5px 10px #ffd700";

  winCombo.forEach(sqIdx => {
    boardSqs[sqIdx].style.color = "#d4af37";
  });
}

function tieColor() {

}

init();