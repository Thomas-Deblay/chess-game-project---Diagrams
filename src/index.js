import {
  diagramBoard1,
  diagramSolution1,
  diagramBoard2,
  diagramSolution2,
  diagramBoard3,
  diagramSolution3,
} from './diagramsData.js';

const diagram1 = new Diagram(
  diagramBoard1,
  diagramSolution1,
  'white',
  3,
  3,
  120
);
const diagram2 = new Diagram(
  diagramBoard2,
  diagramSolution2,
  'white',
  2,
  2,
  120
);

const diagram3 = new Diagram(
  diagramBoard3,
  diagramSolution3,
  'white',
  2,
  2,
  120
);

const diagramList = new DiagramList([diagram1, diagram2, diagram3]);
diagramList.shuffleDiagrams();
/************  HTML ELEMENTS  ************/
const chessBoard = document.querySelector('#chess-board');
const endView = document.querySelector('#end-view');
const infoDiv = document.querySelector('.bottom-infos');
var isWhiteTurn = true;
var ai = false;
var pieceId;

let diagramSolution =
  diagramList.diagrams[diagramList.currentDiagramIndex].diagramSolution;
let move = 0;

//Initiate views
chessBoard.style.display = 'block';
endView.style.display = 'none';

// === DISPLAY NUMBER OF DIAGRAM =====
function counTitle() {
  const displayCount = document.querySelector('#diagram-count');
  displayCount.innerHTML = `Diagram <span>${
    diagramList.diagramCount
  }</span> out of 3 of the day <br> <a class="diagram-rule">The ${
    diagramList.diagrams[diagramList.currentDiagramIndex].whoWin
  } play and win in ${
    diagramList.diagrams[diagramList.currentDiagramIndex].inHowManyMoves
  } moves</a> - <a class='difficulty'> Difficulty : ${diagramList.diagrams[
    diagramList.currentDiagramIndex
  ].displayDifficulty()} </a>`;
}

// ==== SOLUTION BUTTON ===
function setSolutionButton() {
  setTimeout(() => {
    const showSolution = document.createElement('button');
    showSolution.classList.add('solution-button');
    showSolution.innerText = 'Solution';
    showSolution.addEventListener('click', () => {
      diagramList.diagramSucceed--;
      const aiPlayingSolution = setInterval(() => {
        move < diagramSolution.length
          ? aiPlay()
          : clearInterval(aiPlayingSolution);
      }, 2000);
    });
    infoDiv.appendChild(showSolution);
  }, 10000);
}

setSolutionButton();

// ==== CREATE THE BOARD WITH ALL THE EVENT LISTENERS =====================
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
    // Add the line letters and colomn numbers around the board (Bonus)
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

    counTitle();
    columnCount++;
    // starting a new line, reset column notation
    if (columnCount > 7) {
      columnCount = 0;
    }
  });
}
boardInit(diagramList.diagrams[diagramList.currentDiagramIndex].board);

// === Allowing Drag and drop from User
function isDraggred(ev) {
  const piece = ev.target;
  pieceId = piece.id;
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
  let data = pieceId;
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
    //we give the new id to the moving piece
    piece.id = `${piece.id.slice(0, piece.id.length - 2)}${
      diagramSolution[move].moveDestination
    }`;
    nextMove();
    destinationSquare.appendChild(piece);
    // Change the player/color that can play
    isWhiteTurn = !isWhiteTurn;
    return;
  } else {
    //SHOW PLAYER THAT THE ATTENDED MOVE IS NOT THE RIGHT MOVE
    const wrongMove = document.createElement('p');
    wrongMove.classList.add('wrong-move');
    wrongMove.innerText = "That's a wrong move";
    infoDiv.appendChild(wrongMove);
    setTimeout(() => infoDiv.removeChild(wrongMove), 4000);
  }
}

//
function canCapture(square) {
  if (square.querySelector('.piece')) {
    return square.querySelector('.piece').getAttribute('color');
  }
  return '';
}

// === PART THAT CAN BE METHOD OF AN OBJECT
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
  move === diagramSolution.length ? succeedDiagram() : (ai = !ai);
  ai ? aiPlay() : '';
}

// ==== SUCCEED DIAGRAM SEQUENCE ====================================
function succeedDiagram() {
  diagramList.diagramSucceed++;
  document.querySelector('.solution-button')
    ? infoDiv.removeChild(document.querySelector('.solution-button'))
    : '';
  const moveNextButton = document.createElement('button');
  moveNextButton.classList.add('success-button');
  moveNextButton.innerText = 'Next Diagram';
  moveNextButton.addEventListener('click', () => {
    diagramList.moveToNextDiagram();
    removeAllChildNodes(chessBoard);
    move = 0;
    ai = false;
    diagramList.diagrams[diagramList.currentDiagramIndex].whoWin === 'white'
      ? (isWhiteTurn = true)
      : (isWhiteTurn = false);
    diagramSolution =
      diagramList.diagrams[diagramList.currentDiagramIndex].diagramSolution;
    infoDiv.removeChild(moveNextButton);
    setSolutionButton();
    boardInit(diagramList.diagrams[diagramList.currentDiagramIndex].board);
  });

  diagramList.hasEnded() ? showEndView() : infoDiv.appendChild(moveNextButton);
}

function showEndView() {
  document.querySelector('#result').innerText = diagramList.diagramSucceed;
  chessBoard.style.display = 'none';
  endView.style.display = 'block';
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// === MAKE THE MOVE OF THE OPPOSITE COLOR =======================
function aiPlay() {
  const toMove = document.getElementById(diagramSolution[move].pieceId);
  const moveTo = document.getElementById(diagramSolution[move].moveDestination);

  toMove.id = `${toMove.id.slice(0, toMove.id.length - 2)}${
    diagramSolution[move].moveDestination
  }`;

  // I had to do a timeout to have access to the lastChild, otherwise i had the value null
  setTimeout(() => {
    if (moveTo.lastChild) {
      while (moveTo.lastChild) {
        moveTo.removeChild(moveTo.lastChild);
      }
    }
    moveTo.appendChild(toMove);
  }, 500);

  move++;
  move === diagramSolution.length ? succeedDiagram() : '';
  ai = !ai;
  isWhiteTurn = !isWhiteTurn;
}
