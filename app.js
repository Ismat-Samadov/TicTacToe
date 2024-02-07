// Define game module
const game = (() => {
    // Board representation
    const board = ['', '', '', '', '', '', '', '', ''];

    // Players
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;

    // DOM elements
    const boardCells = document.querySelectorAll('.board div');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart-btn');

    // Function to initialize game
    function start() {
        renderBoard();
        setStatus(`${currentPlayer}'s turn`);
        boardCells.forEach(cell => cell.addEventListener('click', handleCellClick));
        restartButton.addEventListener('click', restart);
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();
            if (checkWin(currentPlayer)) {
                setStatus(`${currentPlayer} wins!`);
                endGame();
            } else if (checkDraw()) {
                setStatus("It's a draw!");
                endGame();
            } else {
                currentPlayer = currentPlayer === playerX ? playerO : playerX;
                setStatus(`${currentPlayer}'s turn`);
            }
        }
    }

    // Function to render the game board
    function renderBoard() {
        board.forEach((value, index) => {
            boardCells[index].textContent = value;
        });
    }

    // Function to check if the current player has won
    function checkWin(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winConditions.some(combination =>
            combination.every(index => board[index] === player)
        );
    }

    // Function to check if the game is a draw
    function checkDraw() {
        return board.every(cell => cell !== '');
    }

    // Function to set the game status
    function setStatus(message) {
        statusDisplay.textContent = message;
    }

    // Function to end the game
    function endGame() {
        boardCells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    // Function to restart the game
    function restart() {
        board.fill('');
        currentPlayer = playerX;
        renderBoard();
        setStatus(`${currentPlayer}'s turn`);
        boardCells.forEach(cell => cell.addEventListener('click', handleCellClick));
    }

    // Public methods
    return { start };
})();

// Initialize game
game.start();
