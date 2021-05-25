let board = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];

let ai = 'X';
let human = 'O';
let currentPlayer = human;
const cells = document.querySelectorAll('.cell')

function startGame() {
    board = [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
    ];
    document.querySelector('.endgame').style.display = 'none';
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', clicked, false);
    }
    bestMove(1); // ai goes first
}

startGame();

function clicked(square) {
    let id = parseInt(square.target.id)
    let i = id % 4;
    let j = Math.floor(id / 4);
    if (board[i][j] == '') {
        board[i][j] = human;
        const id = j * 4 + i;
        document.getElementById(id).innerText = human;
        currentPlayer = ai;
        let start = window.performance.now();
        bestMove(4);
        let end = window.performance.now();
        console.log("Time taken per move:", end - start);
    }
}

function equals4(a, b, c, d) {
    return a == b && b == c && c == d && a != '';
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 4; i++) {
        if (equals4(board[i][0], board[i][1], board[i][2], board[i][3])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 4; i++) {
        if (equals4(board[0][i], board[1][i], board[2][i], board[3][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals4(board[0][0], board[1][1], board[2][2], board[3][3])) {
        winner = board[0][0];
    }
    if (equals4(board[3][0], board[2][1], board[1][2], board[0][3])) {
        winner = board[3][0];
    }

    // Blocks
    if (equals4(board[1][1], board[2][1], board[1][2], board[2][2])) {
        winner = board[1][1];
    }
    if (equals4(board[0][0], board[1][0], board[1][1], board[0][1])) {
        winner = board[0][0];
    }
    if (equals4(board[1][0], board[2][0], board[1][1], board[2][1])) {
        winner = board[1][0];
    }
    if (equals4(board[2][0], board[3][0], board[2][1], board[3][1])) {
        winner = board[2][0];
    }
    if (equals4(board[0][1], board[1][1], board[1][2], board[0][2])) {
        winner = board[0][1];
    }
    if (equals4(board[2][1], board[3][1], board[3][2], board[2][2])) {
        winner = board[2][1];
    }
    if (equals4(board[0][2], board[1][2], board[1][3], board[0][3])) {
        winner = board[0][2];
    }
    if (equals4(board[1][2], board[2][2], board[2][3], board[1][3])) {
        winner = board[1][2];
    }
    if (equals4(board[2][2], board[3][2], board[3][3], board[2][3])) {
        winner = board[2][2];
    }

    // Diamonds
    if (equals4(board[1][0], board[2][1], board[1][2], board[0][1])) {
        winner = board[1][0];
    }
    if (equals4(board[2][0], board[3][1], board[2][2], board[1][1])) {
        winner = board[2][0];
    }
    if (equals4(board[1][1], board[2][2], board[1][3], board[0][2])) {
        winner = board[0][2];
    }
    if (equals4(board[2][1], board[3][2], board[2][3], board[1][2])) {
        winner = board[1][2];
    }



    let openSpots = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function updateRes(res) {
    if (res == 'X') {
        scoreUpdate('You Lose!', 'aiScore', '#e43d34');
        return true;
    } else if (res == 'O') {
        scoreUpdate('You Win!', 'huScore', '#4078c0');
        return true;
    } else {
        let es = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerText === '') {
                es++;
            }
        }
        if (es === 0) {
            document.querySelector('.endgame').style.display = "block";
            document.querySelector('.endgame .text').innerText = 'Tie Game!';
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.backgroundColor = "#6e5494";
                cells[i].removeEventListener('click', clicked, false);
            }
            return true;
        }
    }
    return false;
}

function scoreUpdate(msg, score, color) {
    document.querySelector('.endgame').style.display = "block";
    document.querySelector('.endgame .text').innerText = msg;
    let sc = document.querySelector(`.${score}`).innerText;
    document.querySelector(`.${score}`).innerText = parseInt(sc) + 1;
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = color;
        cells[i].removeEventListener('click', clicked, false);
    }
}