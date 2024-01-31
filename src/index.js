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

// Function displaying a board with the position that is given as a parameter
function boardInit(board) {
  //Column variable init
  let columnId = 'abcdefgh';
  let columnCount = 0;

  board.forEach((piece, index) => {
    const square = document.createElement('div');
    // To not move the black and white pattern, i have to create a Piece div
    const pieces = document.createElement('div');
    square.classList.add('square');
    const row = Math.floor((63 - index) / 8);

    //creating square id like chess notation for square and pieces
    square.setAttribute('id', `${columnId[columnCount]}${row + 1}`);
    columnCount++;
    // starting a new line, reset column notation
    if (columnCount > 7) {
      columnCount = 0;
    }

    //// Making white and black square alternate
    if (row % 2) {
      index % 2 ? square.classList.add('black') : square.classList.add('white');
    } else {
      index % 2 ? square.classList.add('white') : square.classList.add('black');
    }
    // Add the line letters and colomn numbers (Bonus)
    //---- code it here ------
    // adding the pieces
    if (piece) {
      pieces.setAttribute('draggable', true);
      pieces.classList.add(`piece`);
      pieces.classList.add(`${piece.slice(1)}`);
      // set type of the piece
      pieces.id = `${piece.slice(1)}${columnId[columnCount]}${row + 1}`;
      //set color of the piece
      pieces.setAttribute(
        'color',
        piece.slice(0, 1) === 'w' ? 'white' : 'black'
      );
      pieces.innerHTML = `<img src="img/${piece}.png" alt="${piece.slice(1)}">`;
      pieces.lastChild.setAttribute('draggable', false);
    }

    square.setAttribute('draggable', false);
    //Adding the eventListenners on the pieces --- DRAG IS STARTING
    pieces.addEventListener('dragstart', isDraggred);

    //Adding the eventListener on the squares --- WHERE DRAG IS LANDING ? AND IS IT AN AVAILABLE MOVE ?
    square.addEventListener('dragover', allowDrop);
    square.addEventListener('drop', drop);

    piece ? square.appendChild(pieces) : '';
    chessBoard.append(square);
  });
}

function isDraggred(ev) {
  const piece = ev.target;
  ev.dataTransfer.setData('text', piece.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  console.log('is dropped');
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  const piece = document.getElementById(data);
  const destinationSquare = ev.currentTarget;
  let destinationSquareId = destinationSquare.id;
  destinationSquare.appendChild(piece);
}

boardInit(boardStart);
