"use strict";
console.log("game on computer");

//ok so got ai delay workihg also got it the print to the board and matrix
// all connected now as if real player (though still some bugs like if i wanted two could
//--just take that ai turn by clicking fater then ai makes move
//--so we want to temp diable the board of clicking while its ai's turn )

//finishe the colomn and diagonal check for bnlocks

//then create ones looking for us to make the winning move(just though about it this should be priority
//--as if we win game end there and thats it no need to even consider their next move)

//then last case where their is nothing to block and no winnig move to make

//Class for the AI
class AI {
  constructor() {
    // this.delay = this.randomTime();
    this.delay = 0;
  }
  container(x, y, board) {
    this.boardMatrix = board;
    // console.log(board);
    // console.log(y, x);
    this.checkForBlock(x, y);
  }

  checkForBlock(x, y) {
    //store access to AI (interesting how delay does just fine)
    let that = this;
    //delay function execution
    setTimeout(function () {
      that.checkRow(x, y);
      that.checkColomn(x, y);
      that.checkDiagonal(x, y);
    }, this.delay);
  }

  checkDiagonal(x, y) {
    //center if opponen dosent have this no need to check anything else (aka if we own it no need to check this)
    let mustMatch = this.boardMatrix[1][1];
    //defualt to false swaps when its open and we fill it
    let ownMiddle = false;
    if (!ownMiddle) {
      let topLeft = this.boardMatrix[0][0];
      let topRight = this.boardMatrix[0][2];
      let bottomLeft = this.boardMatrix[2][0];
      let bottomRight = this.boardMatrix[2][2];
      console.log(y, x);
      console.log(mustMatch);
      //if center is not already own we take it (and dont have to check for any pattern here to block as not possible)
      if (mustMatch === undefined) {
        //if center is open we want it
        console.log("working???????");
        this.pullSlot(1, 1);
        ownMiddle = true;
        return;
      } else {
        //this means that we dont own the center (aka opponen does)
        if (topLeft !== undefined) {
        }
        if (topRight !== undefined) {
        }
        if (bottomLeft !== undefined) {
        }
        if (bottomRight !== undefined) {
        }
      }
      let newY = y < 2 ? 2 : 0;
      let newX = x < 2 ? 2 : 0;
      //   console.log(newX, newY);
      //   this.pullSlot(newX, newY);
    }

    //we'dpass in the the pullSlot the values of the contour of what was originaly passed
  }

  checkColomn(x, y) {
    let value = this.boardMatrix[y][x];
    console.log(value);
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
        console.log("BLOCK IT");
        this.pullSlot(Number(x), isEmpty);
      }
    }
  }

  checkRow(x, y) {
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
        console.log("BLOCK IT");
        this.pullSlot(isEmpty, Number(y));
      }
    }
  }

  //=====================================================================================================
  //=====================================================================================================
  //UNIVARSAL TO LOOK FOR PATTERN OF TWO IN ALL FORMAT FOR EACH PLAYER (FOR BLOCK AND WIN)
  //   searchForTwo(valueLookingFor) {
  //     //we pass in the value looking for in the boardMatrix (aka the player value)
  //     //use for all of the checks block or win
  //   }
  //   checkForWiningMove() {}
  pullSlot(x, y) {
    // can use the y value to know which row to look at
    // console.log("running function or what");
    let element;
    console.log(y, x);
    for (let i = 0; i < allSlots.length; i++) {
      console.log(allSlots[i]);
      if (allSlots[i].getAttribute("data-y-position") === String(y)) {
        if (allSlots[i].getAttribute("data-x-position") === String(x)) {
          console.log("working");
          element = allSlots[i];
          console.log(element);
          board.printTurn(element);
          board.addToBoard(element);
          break;
        }
      }
    }
  }
  randomTime() {
    //want range to be from 1 to 4 seconds
    return parseInt((Math.random() * (2 - 1) + 1) * 1000);
    // console.log(this.delay);
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
          this.rowWin(x, y);
          this.coloumnWin(x, y);
          this.diagonalWin();
          this.printCurrentPlayer();
          this.noWin();

          //only if switch player is this allowed to run
          if (!this.player) {
            ai.container(x, y, this.boardMatrix);
          }
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
  //add value to the actual board matrix (Not Visual)
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
    board.printTurn(target);
    board.addToBoard(target);
  }
});

playButton.addEventListener("click", function () {
  board.initiate();
  board.gameReset(event.target);
});

//thinkig copy basically the addtoBoard and the printTurn functions and fuctionality
// so basically run these with the appropriate values passed through or applied
