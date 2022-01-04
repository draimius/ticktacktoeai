"use strict";
console.log("game on computer");

//basically gonna use all logic had previously in other ticktacktoe
//difference is that where player changed we'd call function or else
//--access other structure where ai is that reads the current board values
//--than decides where the optimal position to block or win the game would be
//--and makes its move there (if done correctly
//----we should never be able to win a game
//---and computer should be able to win everytime the player makes a mistake we exploit it)
//just thinking we'd have ai class structure with its maethod that lika i said reads if
//--finds optiomal position (for block or win)
//--explote player mistakes and never allow the player to win

//if the middle is avialible (always take the middle 1,1)
//--thats always the fist move we aim to make if its not taken
//we look for the usual winning patters but now instead of all three matching
//--we are looking for any matching of two in pattern
//---and is meets that we complete the pattern (blocking the player)
//so we look to block first prevent player from winning
//--if nothing meets the patter matching of two to block
//Then instead we aim to complete our own of three
//(NOTE: in blocking ai look for the two match but only of the value that does not correspond to itself)

//Class for the AI
class AI {
  constructor() {}
  checkRow() {}
  checkColomn() {}
  checkDiagonal() {}
  searchForTwo(valueLookingFor) {
    //we pass in the value looking for in the boardMatrix (aka the player value)
  }
  checkForBlock() {
    //we run searchfortwo and find where
  }
  checkForWiningMove() {
    //check if we have
    //thinking same in structure to refer to later as to not have to loop repeatedly through whole structure
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
  //limit functionality till play button clicked
  initiate() {
    this.gameStarted = true;
    playerText.textContent = "Make your move";
    playButton.textContent = "game on";

    if (this.gameOver === true) {
      console.log("game is over");
      this.gameStarted = false;
    }
  }
  //reset and variable, classed and value back to original
  gameReset(target) {
    console.log(target);
    if (this.gameOver) {
      this.clearBoard();
      this.clearMatrix();
    }
  }
  //helper funciton to clear(create new) matrix board
  clearMatrix() {
    this.boardMatrix = [new Array(3), new Array(3), new Array(3)];
  }
  //helper function clear classes of all spans and element displaying strike through
  clearBoard() {
    allSpan.forEach(function (span) {
      span.classList = "";
      strike.classList = "";
    });
    this.gameOver = false;
    this.gameStarted = true;
    this.player = 1;
  }
  //display the winner and who's turn it is in text above board
  printCurrentPlayer() {
    if (!this.gameOver) {
      if (!this.player) {
        playerText.textContent = "O's Turn";
      } else {
        playerText.textContent = "X's Turn";
      }
    } else {
      if (!this.player) {
        playerText.textContent = "X's Won";
      } else {
        playerText.textContent = "O's Won";
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
          this.rowWin(x, y);
          this.coloumnWin(x, y);
          this.diagonalWin();
          this.printCurrentPlayer();
          this.noWin();
        }
      }
    }
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

//ALL DOM VARIBLES
let frame = document.querySelector("#frame");
let strike = document.querySelector("#strike");
let playButton = document.querySelector("#play-button");
let playerText = document.querySelector("#player-text");
let allSpan = document.querySelectorAll("span");

//ALL EVENT LISTENERS
frame.addEventListener("click", function () {
  if (board.gameStarted) {
    let target = event.target;
    board.printTurn(target);
    board.addToBoard(target);
  }
});

playButton.addEventListener("click", function () {
  board.initiate();
  board.gameReset(event.target);
});
