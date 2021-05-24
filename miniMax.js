
function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    board[move.i][move.j] = ai;
    const id = move.j * 3 + move.i;
    document.getElementById(id).innerText = ai;
    currentPlayer = human;
}

let scores = {
    X: 10,
    O: -10,
    tie: 0
};

function minimax(board, depth, isMaximizing, a = -Infinity, b = Infinity) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, a, b);
                    board[i][j] = '';
                    bestScore = Math.max(score, bestScore);
                    a = Math.max(a, bestScore);
                    if (b <= a) break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true, a, b);
                    board[i][j] = '';
                    bestScore = Math.min(score, bestScore);
                    b = Math.min(b, bestScore);
                    if (b <= a) break;
                }
            }
        }
        return bestScore;
    }
}