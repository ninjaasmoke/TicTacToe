var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');

startGame();


//  function to start game
function startGame() {
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(9).keys());

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick);
    }
}


// turnClick can be called by both human player & ai
function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        // if no one has played that square
        // if square is played, the value will be either X or O => string
        // turn(square.target.id, huPlayer);
        // if (!checkTie()) turn(bestSpot(), aiPlayer); // checks if board is not full & allows ai to play


        if (!checkTie()) { // my logic TODO: change if something breaks in future
            turn(square.target.id, huPlayer);
            turn(bestSpot(), aiPlayer);
        }
    }

}


// actual code to add X & O to the board 
// also checks foe winner
function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    let gameWon = checkWin(origBoard, player);

    if (gameWon) gameOver(gameWon);
}


// function to check winner
function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []); // adds index of board if the player has played it

    let gameWon = null;

    for (let [index, win] of winCombos.entries()) {
        if (win.every(ele => plays.indexOf(ele) > -1)) { // has the player played in every possible win in winCombos
            gameWon = {
                index: index, // index of the winCombo
                player: player, // player who played that win
            };
            break;
        }
    }
    return gameWon;
}


// gameover function
function gameOver(gameWon) {

    for (const index of winCombos[gameWon.index]) {
        let d = document.getElementById(index)
        d.style.backgroundColor =
            gameWon.player == huPlayer ? '#4078c0' : 'red';
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? 'You Win!' : 'You Lose!')

}


// declare winner
function declareWinner(who) {
    document.querySelector('.endgame').style.display = "block";
    document.querySelector('.endgame .text').innerText = who;
}

// basic ai


// returns all empty squares
function emptySquares() {
    return origBoard.filter(c => typeof c == "number");
}


// best spot for ai
function bestSpot() {
    return emptySquares()[0];
}


// check for a tie
function checkTie() {
    if (emptySquares().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "#6e5494";
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!");
        return true;
    }
    return false;
}