"use strict";

let board = document.getElementsByClassName("gameBord")[0];
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let flipedCards = [];
let flipedIndex = [];
let matchedCards = [];
let StartFlag = false;
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
      card.style.transform = "rotateY(180deg)";
      stepsCount++;
      document.getElementById("result").textContent = `Moves: ${stepsCount} `;
      flipedCards.push(path);
      flipedIndex.push(index);
      if (flipedCards.length == 2) {
        if (flipedCards[0] == flipedCards[1]) {
          matchedCards.push(flipedIndex[0]);
          matchedCards.push(flipedIndex[1]);
          /**
           * @type {HTMLElement}
           */

          let c = document.getElementsByClassName("card")[flipedIndex[0]];
          c.style.backgroundColor = "transparent";

          c = document.getElementsByClassName("card")[flipedIndex[1]];
          c.style.backgroundColor = "transparent";

          flipedIndex = [];
          flipedCards = [];
        }
      } else if (flipedCards.length == 3) {
        let FI = flipedIndex[2];
        let FC = flipedCards[2];
        resetCard(matchedCards, FI);
        flipedIndex.push(FI);
        flipedCards.push(FC);
      }
    }
  }
  console.log(
    `%c StepsCount: ${stepsCount} , FlipedCards: ${flipedCards.length}  ,  FlipedIndex: ${flipedIndex.length} ,matchedCards ${matchedCards.length}`,
    "background: #fff;font-size:32px; color: red"
  );

  if (matchedCards.length == 16) {
    document.getElementById(
      "result"
    ).textContent = `You won !!! Moves: ${stepsCount}`;
    document.getElementById("result").style.width = "100%";
    board.style.opacity = "0.1";
    document.getElementById("start").textContent = "Restart Game";
    document.getElementById("start").addEventListener("click", function () {
      location.reload();
    });
  }
}

function resetGame() {
  StartFlag = false;
  arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  matchedCards = [];
  stepsCount = 0;
  board.textContent = "";
  for (let i = 0; i < 16; i++) {
    new Card(i);
  }
  document.getElementById("result").style.display = "none";
  board.style.cursor = "default";
  document.getElementById("start").addEventListener("click", startTheGame);
}

function resetCard(x, c) {
  if (x.length == 0) {
    x = [16, 17];
  }
  for (let index = 0; index < 16; index++) {
    if (x.indexOf(index) == -1 && c != index) {
      let pic = document.getElementsByClassName("card")[index];
      pic.style.transform = "";
    } else {
      let pic = document.getElementsByClassName("card")[index];
      pic.style.transform = "rotateY(180deg)";
    }
  }
  flipedCards = [];
  flipedIndex = [];
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
  document.getElementById("result").style.display = "block";
  document.getElementById("result").textContent = "Let Play";

  document.getElementById("start").removeEventListener("click", startTheGame);
}
