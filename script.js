const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('game-status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Update the game status message
const updateStatus = () => {
  statusDisplay.textContent = gameActive 
    ? `It's ${currentPlayer}'s turn`
    : gameState.includes('') ? `${currentPlayer} wins!` : `It's a tie!`;
};

// Handle cell click
const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedIndex] !== '' || !gameActive) return;

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkForWinner()) {
    gameActive = false;
    updateStatus();
    return;
  }

  if (!gameState.includes('')) {
    gameActive = false;
    updateStatus();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
};

// Check for a winner
const checkForWinner = () => {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
};

// Reset the game
const resetGame = () => {
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach((cell) => {
    const label = cell.getAttribute('data-label');
    cell.textContent = label; // Set the cell text content to its original label
  });
  updateStatus();
};

// Add event listeners
cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', resetGame);
// Handle keyboard navigation
const handleKeydown = (event) => {
  const focusedElement = document.activeElement;
  if (!focusedElement.classList.contains('cell')) return;

  const focusedIndex = parseInt(focusedElement.getAttribute('data-index'));

  let newIndex;
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = (focusedIndex + 3) % 9;
      break;
    case 'ArrowUp':
      event.preventDefault();
      newIndex = (focusedIndex - 3 + 9) % 9;
      break;
    case 'ArrowLeft':
      event.preventDefault();
      newIndex = (focusedIndex - 1 + 9) % 9;
      break;
    case 'ArrowRight':
      event.preventDefault();
      newIndex = (focusedIndex + 1) % 9;
      break;
  }

  if (newIndex !== undefined) {
    cells[newIndex].focus();
  }
};

document.addEventListener('keydown', handleKeydown);
// Initialize the game status
updateStatus();
