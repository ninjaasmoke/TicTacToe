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
        // if square is played, the value will be either X or O => string or null
        turn(square.target.id, huPlayer);
        if (!checkTie()) // bad logic
            turn(bestSpot(), aiPlayer); // checks if board is not full & allows ai to play
    }

}


// actual code to add X & O to the board 
// also checks foe winner
function turn(squareId, player) {
    origBoard[squareId] = player;
    let d = document.getElementById(squareId);
    if (d) {
        d.innerText = player;

        let gameWon = checkWin(origBoard, player);
        if (gameWon) gameOver(gameWon);
    }
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
    // checkTie() // actually good to check for tie before win, but minimax evals to tie always if checked like this
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
    return minimax(origBoard, aiPlayer).index;
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


// minimax 

function minimax(newBoard, player) {
    let availSpots = emptySquares();

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 20 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}