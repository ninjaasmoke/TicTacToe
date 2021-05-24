
function bestMove(n = 3) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Is the spot available?
            if (board[i][j] == '') {
                board[i][j] = ai;
                let score = minimax(board, 0, false, n);
                board[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }
    if (!updateRes(checkWinner())) {
        board[move.i][move.j] = ai;
        const id = move.j * n + move.i;
        document.getElementById(id).innerText = ai;
        currentPlayer = human;
    }
    updateRes(checkWinner());
}

let scores = {
    X: 10,
    O: -10,
    tie: 0
};

function minimax(board, depth, isMaximizing, n, a = -Infinity, b = Infinity) {
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] == '') {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false, n, a, b);
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
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] == '') {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true, n, a, b);
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