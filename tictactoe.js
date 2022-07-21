const player = document.querySelector(".jogador");
const opponent = document.querySelector(".oponente");
const playerPointsHTML = document.querySelector(".pontosJogador");
const opponentPointsHTML = document.querySelector(".pontosOponente");
const resetBtn = document.querySelector(".resetBtn");
let playerPoints = 0;
let opponentPoints = 0;
let isOver = false;
initGame();

const slots = [...document.querySelectorAll(".box")];
slots.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML.length === 0 && isOver === false) {
      box.innerHTML = player.innerHTML;
      checkWinner(player);
      setTimeout(() => {
        if (isOver === false) {
          opponentPlay();
          checkWinner(opponent);
        }
      }, 250);
    }
  });
});

resetBtn.addEventListener("click", () => {
  slots.forEach((s) => (s.innerHTML = ""));
  setPlayers();
  isOver = false;
});

function opponentPlay() {
  const available = slots.filter((s) => s.innerHTML.length == 0);
  available[Math.floor(Math.random() * available.length)].innerHTML =
    opponent.innerHTML;
}

function checkWinner(someone) {
  //horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      slots[i].innerHTML == someone.innerHTML &&
      slots[i + 1].innerHTML == someone.innerHTML &&
      slots[i + 2].innerHTML == someone.innerHTML
    ) {
      if (someone == player) {
        playerPoints += 1;
        playerPointsHTML.innerHTML = playerPoints;
        isOver = true;
      } else {
        opponentPoints += 1;
        opponentPointsHTML.innerHTML = opponentPoints;
        isOver = true;
      }
      return;
    }
  }
  //vertical
  for (let i = 0; i < 3; i++) {
    if (
      slots[i].innerHTML == someone.innerHTML &&
      slots[i + 3].innerHTML == someone.innerHTML &&
      slots[i + 6].innerHTML == someone.innerHTML
    ) {
      if (someone == player) {
        playerPoints += 1;
        playerPointsHTML.innerHTML = playerPoints;
        isOver = true;
      } else {
        opponentPoints += 1;
        opponentPointsHTML.innerHTML = opponentPoints;
        isOver = true;
      }
      return;
    }
  }
  //diagonal primária(/)
  if (
    slots[6].innerHTML == someone.innerHTML &&
    slots[4].innerHTML == someone.innerHTML &&
    slots[2].innerHTML == someone.innerHTML
  ) {
    if (someone == player) {
      playerPoints += 1;
      playerPointsHTML.innerHTML = playerPoints;
      isOver = true;
    } else {
      opponentPoints += 1;
      opponentPointsHTML.innerHTML = opponentPoints;
      isOver = true;
    }
    return;
  }
  //diagonal secundária(\)
  if (
    slots[0].innerHTML == someone.innerHTML &&
    slots[4].innerHTML == someone.innerHTML &&
    slots[8].innerHTML == someone.innerHTML
  ) {
    if (someone == player) {
      playerPoints += 1;
      playerPointsHTML.innerHTML = playerPoints;
      isOver = true;
    } else {
      opponentPoints += 1;
      opponentPointsHTML.innerHTML = opponentPoints;
      isOver = true;
    }
    return;
  }

  //empate
  if (
    slots[0].innerHTML.length > 0 &&
    slots[1].innerHTML.length > 0 &&
    slots[2].innerHTML.length > 0 &&
    slots[3].innerHTML.length > 0 &&
    slots[4].innerHTML.length > 0 &&
    slots[5].innerHTML.length > 0 &&
    slots[6].innerHTML.length > 0 &&
    slots[7].innerHTML.length > 0 &&
    slots[8].innerHTML.length > 0
  ) {
    isOver = true;
    return;
  }
}

function createGrid() {
  const table = document.createElement("table");
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const square = document.createElement("td");
      square.classList.add("box");
      row.appendChild(square);
    }
    table.appendChild(row);
  }
  const grid = document.querySelector(".tabuleiro");
  grid.appendChild(table);
}

function setPlayers() {
  const opc = ["X", "O"];
  player.innerHTML = opc[Math.floor(Math.random() * 2)];
  if (player.innerHTML == opc[0]) {
    opponent.innerHTML = opc[1];
  } else {
    opponent.innerHTML = opc[0];
  }
}

function initGame() {
  setPlayers();
  createGrid();
}
