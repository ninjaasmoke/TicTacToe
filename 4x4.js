var origBoard;
const human = 'X';
const ai = 'O';

const winCombos = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],

    [3, 6, 9, 12],
    [5, 6, 9, 10],

    [0, 1, 4, 5],
    [1, 2, 5, 6],
    [2, 3, 6, 7],
    [4, 5, 8, 9],
    [5, 6, 9, 10],
    [6, 7, 10, 11],
    [8, 9, 12, 13],
    [9, 10, 13, 14],
    [10, 12, 14, 15],

];

const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
    document.querySelector('.endgame').style.display = "none";
    origBoard = Array.from(Array(16).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, human);
        var s = window.performance.now();
        if (!checkTie())
            turn(bestSpot(), ai);
        var end = window.performance.now();
        console.log(`Execution time: ${end - s} ms`)
    }

}

function turn(squareId, player) {
    origBoard[squareId] = player;
    let d = document.getElementById(squareId);
    if (d) {
        d.innerText = player;

        let gameWon = checkWin(origBoard, player);
        if (gameWon) gameOver(gameWon);
    }
}

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

    let humanWon = gameWon.player == human;

    for (const index of winCombos[gameWon.index]) { // updating winning squares
        let d = document.getElementById(index)
        d.style.backgroundColor =
            humanWon ? '#4078c0' : 'red';
    }

    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }

    if (humanWon) {
        let huScore = document.querySelector('.huScore').innerText;
        document.querySelector('.huScore').innerText = parseInt(huScore) + 1;
    } else {
        let aiScore = document.querySelector('.aiScore').innerText;
        document.querySelector('.aiScore').innerText = parseInt(aiScore) + 1;
    }

    declareWinner(humanWon ? 'You Win!' : 'You Lose!')

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
    return minimax(origBoard, ai).index;
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

function minimax(newBoard, player, depth = 5, a = -Infinity, b = Infinity) { // depth 1 greater than total squares
    let availSpots = emptySquares();

    if (checkWin(newBoard, human)) {
        return { score: -16 };
    } else if (checkWin(newBoard, ai)) {
        return { score: 16 };
    } else if (availSpots.length === 0 || depth == 0) {
        return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == ai) {
            var result = minimax(newBoard, human, depth - 1, a, b);
            move.score = result.score;
            // a = Math.max(a, move.score || b);
            // if (b <= a) break;
        } else {
            var result = minimax(newBoard, ai, depth - 1, a, b);
            move.score = result.score;
            // b = Math.min(b, move.score || a);
            // if (b <= a) break;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === ai) {
        var bestScore = -Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = Infinity;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}