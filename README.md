# TicTacToe

This is a simple tic-tac-toe game.

The player plays against an AI, which uses ```minimax``` algorithm to find the best logical move. <br />
The player starts with 'X' and the AI plays 'O'. <br />
It's probably impossible to win this game.

### Minimax Algorithm
Minimax is a decision rule used in artificial intelligence, decision theory, game theory, statistics, and philosophy for minimizing the possible loss for a worst case scenario. When dealing with gains, it is referred to as "maximin"—to maximize the minimum gain. <br /> 
[Read more](https://en.wikipedia.org/wiki/Minimax) about Minimax. <br />

### Project
This project is aimed at understanding the fundamentals of the ```minimax``` algorithm. <br />
It is fairly simple, as the number of squares are only **9**. The machine can quickly get through all the moves and decide the best move. <br />
This is achieved based on a rating system, where the AI is _virtually punished_ every time it makes a wrong move and is _rewarded_ each time it makes the right moves. <br />
Recursion is used to go through _all_ possible moves.

### Further Reading
With increase in number of possible moves, the time complexity increases exponentially. This can be averted using ```Alpha-Beta pruning```. <br />
[Read more](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning) about Alpha-Beta pruning.

### Installation & Playing
Visit [this link](http://ninjaasmoke.tech/TicTacToe/) to play the game. <br/>
Download or clone this repo, open ```index.html``` file in a live server.
