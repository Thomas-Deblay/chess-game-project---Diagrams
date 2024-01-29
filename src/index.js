/************  HTML ELEMENTS  ************/
const chessBoard = document.querySelector('#chess-board');

/************  Board start   ************/
const boardStart = [
  'bRook',
  'bKnight',
  'bBishop',
  'bQueen',
  'bKing',
  'bBishop',
  'bKnight',
  'bRook',
  'bPawn',
  'bPawn',
  'bPawn',
  'bPawn',
  'bPawn',
  'bPawn',
  'bPawn',
  'bPawn',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  'wPawn',
  'wPawn',
  'wPawn',
  'wPawn',
  'wPawn',
  'wPawn',
  'wPawn',
  'wPawn',
  'wRook',
  'wKnight',
  'wBishop',
  'wQueen',
  'wKing',
  'wBishop',
  'wKnight',
  'wRook',
];

function boardInit() {
  boardStart.forEach((piece, index) => {
    const square = document.createElement('div');
    // white and black square alternate
    square.classList.add('square');
    const row = Math.floor((63 - index) / 8);
    if (row % 2) {
      index % 2 ? square.classList.add('black') : square.classList.add('white');
    } else {
      index % 2 ? square.classList.add('white') : square.classList.add('black');
    }

    chessBoard.append(square);
  });
}
boardInit();
