/************  HTML ELEMENTS  ************/
const chessBoard = document.querySelector('#chess-board');
isWhiteTurn = true;
// ai = false;

const diagramSolution = [
  { pieceId: 'Pawnd2', moveDestination: 'd4' },
  { pieceId: 'Pawnd7', moveDestination: 'd5' },
  { pieceId: 'Pawne2', moveDestination: 'e4' },
  { pieceId: 'Pawnd5', moveDestination: 'e4' },
];
let move = 0;

//Making The AI play
// if (ai) aiPlay();

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

    //Adding the eventListener on the squares --- WHERE DRAG IS LANDING ? AND IS IT AN AVAILABLE AREA (THE BOARD) ?
    square.addEventListener('dragover', allowDrop);
    square.addEventListener('drop', drop);

    piece ? square.appendChild(pieces) : '';
    chessBoard.append(square);

    columnCount++;
    // starting a new line, reset column notation
    if (columnCount > 7) {
      columnCount = 0;
    }
  });
}

function isDraggred(ev) {
  const piece = ev.target;
  // If it's the color turn, then can play
  const pieceColor = piece.getAttribute('color');
  (isWhiteTurn && pieceColor === 'white') ||
  (!isWhiteTurn && pieceColor === 'black')
    ? ev.dataTransfer.setData('text', piece.id)
    : '';
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData('text');
  const piece = document.getElementById(data);
  const destinationSquare = ev.currentTarget;
  let destinationSquareId = destinationSquare.id;

  // check if it's the right next move and allow Capture if it is one
  if (
    canCapture(destinationSquare) &&
    diagramSolutionMoves(piece.id, destinationSquareId)
  ) {
    while (destinationSquare.firstChild) {
      destinationSquare.removeChild(destinationSquare.firstChild);
    }
    piece.id = `${piece.id.slice(0, piece.id.length - 2)}${
      diagramSolution[move].moveDestination
    }`;
    nextMove();
    destinationSquare.appendChild(piece);
    isWhiteTurn = !isWhiteTurn;
    return;
  } else if (diagramSolutionMoves(piece.id, destinationSquareId)) {
    //we give the newx id to the moving piece
    piece.id = `${piece.id.slice(0, piece.id.length - 2)}${
      diagramSolution[move].moveDestination
    }`;
    nextMove();
    destinationSquare.appendChild(piece);
    // Change the player/color that can play
    isWhiteTurn = !isWhiteTurn;
    return;
  } else {
    console.log('this is not the right Move');
  }
}

//
function canCapture(square) {
  if (square.querySelector('.piece')) {
    return square.querySelector('.piece').getAttribute('color');
  }
  return '';
}

function diagramSolutionMoves(startingPieceId, triedMove) {
  if (
    startingPieceId === diagramSolution[move].pieceId &&
    triedMove === diagramSolution[move].moveDestination
  ) {
    return true;
  }
  return false;
}

//we go to the next move after we have updated the new square for the piece id
function nextMove() {
  move++;
  //   ai = !ai;
  return move === diagramSolution.length ? succeedDiagram() : '';
}

function succeedDiagram() {
  console.log('you ve succeed');
}

// function aiPlay() {
//   console.log('the AI have Play, YourTURN');
//   move++;
//   isWhiteTurn = !isWhiteTurn;
// }

boardInit(boardStart);
