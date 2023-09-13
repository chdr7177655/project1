

var currentPlayer = 'X';
var boardCells = document.getElementsByClassName('cell');


function cellClicked() {
    if (this.textContent !== '') return;

    this.textContent = currentPlayer;
    this.style.cursor = 'default';

    if (checkWin()) {
        setTimeout(() => {
            alert('שחקן ' + currentPlayer + ' ניצח!');
        }, 100)
        setTimeout(() => {
            resetBoard()
        }, 100)
        return;

    }

    if (checkTie()) {
        setTimeout(() => {
            alert('המשחק נגמר בתיקו');;
        }, 100)
        setTimeout(() => {
            resetBoard()
        }, 100)
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    var board = [];

    for (var i = 0; i < boardCells.length; i++) {
        board.push(boardCells[i].textContent);
    }

    var lines = [
        // תרשימים אופקיים
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // תרשימים אנכיים
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // תרשימים אלכסוניים
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (var i = 0; i < lines.length; i++) {
        var [a, b, c] = lines[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    for (var i = 0; i < boardCells.length; i++) {
        if (boardCells[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function resetBoard() {
    for (var i = 0; i < boardCells.length; i++) {
        boardCells[i].textContent = '';
        boardCells[i].style.cursor = 'pointer';
        location.reload()
    }
    currentPlayer = 'X';
}

function switchToPlayerVsPlayer() {
    for (var i = 0; i < boardCells.length; i++) {
        boardCells[i].addEventListener('click', cellClicked);
    }
}




var isVsComputer = false;


function switchToPlayerVsComputer() {
    isVsComputer = true;
    for (var i = 0; i < boardCells.length; i++) {
        boardCells[i].addEventListener('click', cellClickedVsComputer);
    }
}


function cellClickedVsComputer() {
    if (this.textContent !== '' || !isVsComputer) return;

    this.textContent = currentPlayer;
    this.style.cursor = 'default';

    if (checkWin()) {
        setTimeout(() => {
            alert('שחקן ' + currentPlayer + ' ניצח!');
        }, 100)
        setTimeout(() => {
            resetBoard()
        }, 100)
        return;
    }

    if (checkTie()) {
        setTimeout(() => {
            alert('המשחק נגמר בתיקו');
        }, 100)
        setTimeout(() => {
            resetBoard()
        }, 100)
        return;
    }

    currentPlayer = 'O';

    
    setTimeout(computerMove, 500);
}


function computerMove() {
    if (!isVsComputer || currentPlayer !== 'O') return;

    var emptyCells = [];
    for (var i = 0; i < boardCells.length; i++) {
        if (boardCells[i].textContent === '') {
            emptyCells.push(boardCells[i]);
        }
    }

    if (emptyCells.length > 0) {
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        emptyCells[randomIndex].textContent = currentPlayer;
        emptyCells[randomIndex].style.cursor = 'default';

        if (checkWin()) {
            setTimeout(() => {
                alert('המחשב ניצח!');
            }, 100)
            setTimeout(() => {
                resetBoard()
            }, 100)
            return;
        }

        if (checkTie()) {
            setTimeout(() => {
                alert('המשחק נגמר בתיקו');
                
            }, 100)
            setTimeout(() => {
                resetBoard()
            }, 100)
            return;
        }

        currentPlayer = 'X';
    }
}


document.getElementById('vsPlayerButton').addEventListener('click', switchToPlayerVsPlayer);
document.getElementById('vsComputerButton').addEventListener('click', switchToPlayerVsComputer);

