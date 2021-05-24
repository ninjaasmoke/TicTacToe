let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;
const cells = document.querySelectorAll('.cell')

function startGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    document.querySelector('.endgame').style.display = 'none';
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', clicked, false);
    }
    // bestMove(); // ai goes first
}

startGame();

function clicked(square) {
    let id = parseInt(square.target.id)
    let i = id % 3;
    let j = Math.floor(id / 3);
    if (board[i][j] == '') {
        board[i][j] = human;
        const id = j * 3 + i;
        document.getElementById(id).innerText = human;
        currentPlayer = ai;
        bestMove();
    }
}

function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    // Diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
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
        scoreUpdate('Ypu Win!', 'huScore', '#4078c0');
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