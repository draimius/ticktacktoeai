"use strict";
console.log("game on, computer");

//Class for the AI
class AI {
  constructor() {
    this.delay = 100;
    this.ownCenter = false;
  }
  container(x, y, board) {
    this.boardMatrix = board;
    this.checkForWiningMove(x, y);
    this.checkForBlock(x, y);
    if (board.gameOver) {
      this.ownCenter = false;
    }
  }

  checkForBlock(x, y) {
    let that = this;
    setTimeout(function () {
      that.checkRow(x, y);
      that.checkColomn(x, y);
      that.checkDiagonal(x, y);
      that.elseMove();
    }, this.delay);
  }
  checkForWiningMove() {
    let that = this;
    setTimeout(function () {
      that.checkRowWin();
      that.checkColomnWin();
      that.checkDiagonalWin();
    }, this.delay);
  }

  checkDiagonal(x, y) {
    if (!board.player) {
      let mustMatch = this.boardMatrix[1][1];
      if (this.ownCenter) {
        return;
      } else if (mustMatch === undefined) {
        this.pullSlot(1, 1);
        this.ownCenter = true;
        return;
      } else {
        if (
          this.boardMatrix[0][0] === undefined &&
          this.boardMatrix[2][2] === mustMatch
        ) {
          this.pullSlot(0, 0);
        } else if (
          this.boardMatrix[2][0] === undefined &&
          this.boardMatrix[0][2] === mustMatch
        ) {
          this.pullSlot(0, 2);
        } else if (
          this.boardMatrix[2][2] === undefined &&
          this.boardMatrix[0][0] === mustMatch
        ) {
          this.pullSlot(2, 2);
        } else if (
          this.boardMatrix[0][2] === undefined &&
          this.boardMatrix[2][0] === mustMatch
        ) {
          this.pullSlot(2, 0);
        }
      }
    }
    return;
  }

  checkColomn(x, y) {
    if (!board.player) {
      let value = this.boardMatrix[y][x];
      let matchCount = 0;
      let isEmpty = false;
      if (value !== undefined) {
        for (let i = 0; i < 3; i++) {
          let item = this.boardMatrix[i][x];
          if (item === value) {
            matchCount++;
          }
          if (item === undefined) {
            isEmpty = i;
          }
        }
        if (matchCount === 2 && isEmpty !== false) {
          this.pullSlot(Number(x), isEmpty);
        }
      }
    }
    return;
  }

  checkRow(x, y) {
    if (!board.player) {
      let rowCheck = this.boardMatrix[y];
      let value = rowCheck[x];
      let matchCount = 0;
      let isEmpty = false;
      if (value !== undefined) {
        for (let i = 0; i < rowCheck.length; i++) {
          let item = rowCheck[i];
          if (item === value) {
            matchCount++;
          }
          if (item === undefined) {
            isEmpty = i;
          }
        }
        if (matchCount === 2 && isEmpty !== false) {
          this.pullSlot(isEmpty, Number(y));
        }
      }
    }
    return;
  }

  pullSlot(x, y) {
    let element;
    for (let i = 0; i < allSlots.length; i++) {
      if (allSlots[i].getAttribute("data-y-position") === String(y)) {
        if (allSlots[i].getAttribute("data-x-position") === String(x)) {
          element = allSlots[i];
          board.addToBoard(element);
          board.printTurn(element);
          return;
        }
      }
    }
  }
  checkRowWin() {
    if (!board.player) {
      for (let i = 0; i < this.boardMatrix.length; i++) {
        let matchCount = 0;
        let isEmpty = false;
        for (let j = 0; j < this.boardMatrix[i].length; j++) {
          let item = this.boardMatrix[i][j];
          if (item === 0) {
            matchCount++;
          }
          if (item === undefined) {
            isEmpty = j;
          }
          if (matchCount === 2 && isEmpty !== false) {
            this.pullSlot(isEmpty, i);
          }
        }
      }
    }
    return;
  }
  checkColomnWin() {
    if (!board.player) {
      for (let i = 0; i < this.boardMatrix.length; i++) {
        let matchCount = 0;
        let isEmpty = false;
        for (let j = 0; j < this.boardMatrix[i].length; j++) {
          let item = this.boardMatrix[j][i];
          if (item === 0) {
            matchCount++;
          }
          if (item === undefined) {
            isEmpty = j;
          }
        }
        if (matchCount === 2 && isEmpty !== false) {
          this.pullSlot(i, isEmpty);
        }
      }
    }
    return;
  }
  checkDiagonalWin() {
    if (!board.player) {
      if (this.boardMatrix[1][1] === 0) {
        let mustMatch = 0;
        if (
          this.boardMatrix[0][0] === undefined &&
          this.boardMatrix[2][2] === mustMatch
        ) {
          this.pullSlot(0, 0);
        } else if (
          this.boardMatrix[2][0] === undefined &&
          this.boardMatrix[0][2] === mustMatch
        ) {
          this.pullSlot(0, 2);
        } else if (
          this.boardMatrix[2][2] === undefined &&
          this.boardMatrix[0][0] === mustMatch
        ) {
          this.pullSlot(2, 2);
        } else if (
          this.boardMatrix[0][2] === undefined &&
          this.boardMatrix[2][0] === mustMatch
        ) {
          this.pullSlot(2, 0);
        }
      }
    }
    return;
  }

  elseMove() {
    if (!board.player) {
      if (this.boardMatrix[1][1] === 1) {
        if (this.boardMatrix[0][0] === undefined) {
          this.pullSlot(0, 0);
        } else if (this.boardMatrix[2][0] === undefined) {
          this.pullSlot(0, 2);
        } else if (this.boardMatrix[2][2] === undefined) {
          this.pullSlot(2, 2);
        } else if (this.boardMatrix[0][2] === undefined) {
          this.pullSlot(2, 0);
        }
        return;
      } else if (this.boardMatrix[1][1] === 0) {
        if (this.boardMatrix[1][0] === undefined) {
          this.pullSlot(0, 1);
        } else if (this.boardMatrix[0][2] === undefined) {
          this.pullSlot(1, 0);
        } else if (this.boardMatrix[2][1] === undefined) {
          this.pullSlot(1, 2);
        } else if (this.boardMatrix[1][2] === undefined) {
          this.pullSlot(2, 1);
        }
        return;
      }
      for (let i = 0; i < this.boardMatrix.length; i++) {
        for (let j = 0; j < this.boardMatrix[i].length; j++) {
          if (this.boardMatrix[i][j] === undefined) {
            this.pullSlot(j, i);
            return;
          }
        }
      }
    }
    return;
  }
}

// Class for GameBoard
class GameBoard {
  constructor() {
    this.gameStarted = false;
    this.gameOver = false;
    this.player = 1;
    this.boardMatrix = [new Array(3), new Array(3), new Array(3)];
  }
  initiate() {
    this.gameStarted = true;
    playerText.textContent = "Make your move";
    playButton.textContent = "game on";

    if (this.gameOver === true) {
      console.log("game is over");
      this.gameStarted = false;
    }
  }
  gameReset() {
    if (this.gameOver) {
      this.clearBoard();
      this.clearMatrix();
    }
  }
  clearMatrix() {
    this.boardMatrix = [new Array(3), new Array(3), new Array(3)];
  }
  clearBoard() {
    allSpan.forEach(function (span) {
      span.classList = "";
      strike.classList = "";
    });
    this.gameOver = false;
    this.gameStarted = true;
    this.player = 1;
  }
  printCurrentPlayer() {
    if (!this.gameOver) {
      if (!this.player) {
        playerText.textContent = "Computer Turn";
      } else {
        playerText.textContent = "X's Turn";
      }
    } else {
      if (!this.player) {
        playerText.textContent = "X's Won";
      } else {
        playerText.textContent = "Computer Won";
      }
    }
  }
  addToBoard(element) {
    if (!this.gameOver) {
      if (element.classList[0] === "display") {
        let x = element.getAttribute("data-x-position");
        let y = element.getAttribute("data-y-position");
        if (this.boardMatrix[y][x] === undefined) {
          this.boardMatrix[y][x] = this.player;
          this.printTurn(element);
          this.checkForWin(x, y);
          this.printCurrentPlayer();
          if (!this.player) {
          }
          ai.container(x, y, this.boardMatrix);
          this.noWin();
        }
      }
    }
  }
  checkForWin(x, y) {
    this.rowWin(x, y);
    this.coloumnWin(x, y);
    this.diagonalWin();
  }
  noWin() {
    let winNotPossible = true;
    for (let item of this.boardMatrix[0]) {
      if (item === undefined) {
        winNotPossible = false;
      }
    }
    for (let item of this.boardMatrix[1]) {
      if (item === undefined) {
        winNotPossible = false;
      }
    }
    for (let item of this.boardMatrix[2]) {
      if (item === undefined) {
        winNotPossible = false;
      }
    }
    if (winNotPossible) {
      playButton.textContent = "play again";
      playerText.textContent = "no winner";
      this.gameOver = true;
    }
  }
  diagonalWin() {
    let mustMatch = this.boardMatrix[1][1];
    let topLeft = this.boardMatrix[0][0];
    let topRight = this.boardMatrix[0][2];
    let strikeValue;
    if (mustMatch !== undefined) {
      if (topLeft === mustMatch) {
        if (this.boardMatrix[2][2] === mustMatch) {
          strikeValue = "d2";
          this.displayStrike(strikeValue);
        }
      }
      if (topRight === mustMatch) {
        if (this.boardMatrix[2][0] === mustMatch) {
          strikeValue = "d1";
          this.displayStrike(strikeValue);
        }
      }
    }
  }
  coloumnWin(x, y) {
    let value = this.boardMatrix[y][x];
    let strikeValue = Number(x) + 1;
    if (value !== undefined) {
      for (let i = 0; i < 3; i++) {
        let capture = this.boardMatrix[i][x];
        if (value !== capture) {
          return;
        }
      }
    }
    this.displayStrike("v" + strikeValue);
  }
  rowWin(x, y) {
    let rowCheck = this.boardMatrix[y];
    let value = rowCheck[x];
    let strikeValue = Number(y) + 1;
    if (value !== undefined) {
      for (let item of rowCheck) {
        if (item !== value) {
          return;
        }
      }
      this.displayStrike("h" + strikeValue);
    }
  }

  displayStrike(strikeValue) {
    console.log("winner winner chicken dinner");
    if (!this.gameOver) {
      switch (strikeValue) {
        case "h1":
          strike.classList = "horizontal-1";
          break;
        case "h2":
          strike.classList = "horizontal-2";
          break;
        case "h3":
          strike.classList = "horizontal-3";
          break;
        case "v1":
          strike.classList = "vertical-1";
          break;
        case "v2":
          strike.classList = "vertical-2";
          break;
        case "v3":
          strike.classList = "vertical-3";
          break;
        case "d1":
          strike.classList = "diagonal-2";
          break;
        case "d2":
          strike.classList = "diagonal-1";
          break;
        default:
          break;
      }
    }
    playButton.textContent = "play again";
    this.gameOver = true;
  }
  printTurn(squareSelected) {
    let targetChildren = squareSelected.children;
    if (!this.gameOver) {
      if (squareSelected.classList["value"] === "display") {
        for (let child of targetChildren) {
          if (child.classList.value === "") {
            if (this.player) {
              this.printX(squareSelected);
              this.player = 0;
            } else {
              this.printO(squareSelected);
              this.player = 1;
            }
          }
        }
      }
    }
  }
  printO(parentDiv) {
    let spanShape = parentDiv.children;
    let count = 1;
    for (let span of spanShape) {
      span.classList.add(`data-o${count}`);
      count++;
    }
  }
  printX(parentDiv) {
    let spanShape = parentDiv.children;
    let count = 1;
    for (let span of spanShape) {
      span.classList.add(`data-x${count}`);
      count++;
    }
  }
}

//CREATE NEW GAME BOARD
let board = new GameBoard();
//CREATE NEW AI
let ai = new AI();

//ALL DOM VARIBLES
let frame = document.querySelector("#frame");
let strike = document.querySelector("#strike");
let playButton = document.querySelector("#play-button");
let playerText = document.querySelector("#player-text");
let allSpan = document.querySelectorAll("span");
let allSlots = document.querySelectorAll("[data-y-position]");

//ALL EVENT LISTENERS
frame.addEventListener("click", function () {
  if (board.gameStarted) {
    let target = event.target;
    board.addToBoard(target);
  }
});

playButton.addEventListener("click", function () {
  board.initiate();
  board.gameReset(event.target);
});

//NOTES:
//still some small bug and thinking much better way to search and store value (hashtable) this way can just pull everything in
//constant time and remember all values on board and dont have to search through whole thing or part of it for checks(???)
//also could check different patterns/set up simpler i believe(refactored vertion in new version with added feature)
//improve it all (want to make it 2 player actual online, you can send link to friend and play in real time)
