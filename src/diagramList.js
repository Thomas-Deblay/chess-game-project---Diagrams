class DiagramList {
  constructor(diagrams) {
    this.diagrams = diagrams;
    this.currentDiagramIndex = 0;
    this.diagramCount = 1;
    this.diagramSucceed = 0;
  }

  shuffleDiagrams() {
    return this.diagrams.sort((a, b) => 0.5 - Math.random());
  }

  moveToNextDiagram() {
    //code here
    this.diagramCount++;
    this.currentDiagramIndex++;
  }

  hasEnded() {
    //code here
    if (this.diagramCount === 3) {
      return true;
    }
    return false;
  }
}
