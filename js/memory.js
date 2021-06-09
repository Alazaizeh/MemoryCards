"use strict";

let board = document.getElementsByClassName("gameBord")[0];
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let clickCounter = 0;
let clickIndex = [];
let mathchedIndex = [];
let StartFlag = false;
let DontClear = [];
let stepsCount = 0;
class Card {
  constructor(cardIndex, imgPath = 0) {
    this.imgPath = imgPath;
    this.cardIndex = cardIndex;
    this.getRandomIntInclusive();
    this.renderCard();
  }
  getRandomIntInclusive() {
    let min = Math.ceil(0);
    let max = Math.floor(arr.length - 1);
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    if (this.imgPath == 0) {
      this.imgPath = arr.splice(randomNum, 1);
    }
  }

  renderCard() {
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("onclick", `showCard(${this.cardIndex},${this.imgPath})`);
    let img = document.createElement("img");
    img.className = "front-face";
    img.setAttribute("src", `../imgs/memory/${this.imgPath}.png`);
    card.appendChild(img);
    let overlay = document.createElement("div");
    overlay.className = "back-face";
    card.appendChild(overlay);
    board.appendChild(card);
  }
}

function showCard(index, path) {
  if (StartFlag) {
    let card = document.getElementsByClassName("card")[index];
    if (card.style.transform != "rotateY(180deg)") {
      if (clickIndex.length == 2) {
        if (clickIndex[0] == clickIndex[1]) {
          DontClear.push(mathchedIndex[0]);
          DontClear.push(mathchedIndex[1]);
        }
        clickCounter = 0;
        clickIndex = [];
        mathchedIndex = [];
        resetCard(DontClear);
      }
      stepsCount++;
      document.getElementById("result").style.display = "block";
      document.getElementById("result").textContent = `Moves: ${stepsCount}`;
      clickIndex.push(path);
      mathchedIndex.push(index);
      card.style.transform = "rotateY(180deg)";
      clickCounter++;
      console.log(DontClear.length);
      if (DontClear.length == 14) {
        if (stepsCount % 2 == 0) {
          document.getElementById(
            "result"
          ).textContent = `You won !!! Moves: ${stepsCount}`;

          setTimeout(function () {
            resetGame();
          }, 2500);
        }
      }
    }
  }
}

function resetGame() {
  StartFlag = false;
  arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  DontClear = [];
  stepsCount = 0;
  board.textContent = "";
  for (let i = 0; i < 16; i++) {
    new Card(i);
  }
  document.getElementById("result").style.display = "none";
  board.style.cursor = "default";
  document.getElementById("start").addEventListener("click", startTheGame);
}

function resetCard(x) {
  if (x.length == 0) {
    x = [16, 17];
  }

  for (let index = 0; index < 16; index++) {
    if (x.indexOf(index) == -1) {
      let pic = document.getElementsByClassName("card")[index];
      pic.style.transform = "";
    } else {
      let pic = document.getElementsByClassName("card")[index];
      pic.style.transform = "rotateY(180deg)";
    }
  }
}

for (let i = 0; i < 16; i++) {
  new Card(i);
}

document.getElementById("start").addEventListener("click", startTheGame);
function startTheGame(e) {
  StartFlag = true;
  /**
   * @type {HTMLElement}
   */

  let all = document.getElementsByClassName("card");
  for (let i = 0; i < all.length; i++) {
    all[i].style.transform = "rotateY(180deg)";
  }
  setTimeout(function () {
    for (let i = 0; i < all.length; i++) {
      all[i].style.transform = "";
    }
  }, 2500);
  board.style.cursor = "pointer";

  document.getElementById("start").removeEventListener("click", startTheGame);
}
