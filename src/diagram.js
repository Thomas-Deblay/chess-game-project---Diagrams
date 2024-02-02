class Diagram {
  constructor(
    board,
    diagramSolution,
    whoWin,
    inHowManyMoves,
    difficulty,
    timeAllowed
  ) {
    this.board = board;
    this.diagramSolution = diagramSolution;
    this.whoWin = whoWin;
    this.inHowManyMoves = inHowManyMoves;
    this.difficulty = difficulty;
    this.timeAllowed = timeAllowed;
  }

  getWhoStart() {
    return console.log(this.whoWin);
  }

  displayDifficulty() {
    return this.difficulty === 1
      ? "<a class='difficulty-stars'>*</a>**"
      : this.difficulty === 2
      ? "<a class='difficulty-stars'>**</a>*"
      : "<a class='difficulty-stars'>***</a>";
  }
}
