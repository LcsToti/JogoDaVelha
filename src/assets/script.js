const symbTurn = document.getElementById("symbTurn");
const message = document.getElementById("message");
const victory = document.getElementById("victory");
const winnerSymb = document.getElementById("winnerSymb");
const draw = document.getElementById("draw");
const newGame = document.getElementById("newGame");
const newGameSure = document.getElementById("newGameSure");
const newGameBox = document.getElementById("newGameBox");
const yes = document.getElementById("yes");
const no = document.getElementById("no");

const slots = Array.from(document.getElementsByClassName("slot"));

let pos = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let findWin = [];
let xTime = true;
let totalRound = 0;
let gameOver = false;

slots.forEach(function (slot) {
  slot.onclick = function () {
    if (!gameOver) {
      console.clear();

      slotIndex = slot.id.split("-");
      iSlot = slotIndex[0];
      jSlot = slotIndex[1];

      if (pos[iSlot][jSlot] !== 0) {
        return;
      }

      slot.classList.remove("slotEmpty");
      slot.classList.add("slotFilled");

      if (xTime) {
        pos[iSlot][jSlot] = 1;
        slot.textContent = "X";
        slot.classList.add("X");

        symbTurn.style.backgroundColor = "#ff5d5d";
        symbTurn.innerText = "O";
      } else {
        pos[iSlot][jSlot] = 2;
        slot.textContent = "O";
        slot.classList.add("O");

        symbTurn.style.backgroundColor = "#5db0ff";
        symbTurn.innerText = "X";
      }

      xTime = !xTime;

      // Verificaçaõ de Vitoria Horizontal
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          findWin.push(pos[i][j]);
          validateWin();
        }
        findWin = [];
      }

      findWin = [];

      // Verificaçaõ de Vitoria Vertical
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          findWin.push(pos[j][i]);
          validateWin();
        }
        findWin = [];
      }
      findWin = [];

      // Verificaçaõ de Vitoria Diagonal Principal
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          if (i == j) {
            findWin.push(pos[i][j]);
          }
        }
      }
      validateWin();
      findWin = [];

      // Verificaçaõ de Vitoria Diagonal Secundaria
      for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 3; j++) {
          if (i + j === 2) {
            findWin.push(pos[i][j]);
          }
        }
      }
      validateWin();
      findWin = [];

      totalRound++;
      if (!gameOver && totalRound == 9) {
        gameOver = true;
        message.style.display = "none";
        draw.style.display = "block";
      }
    }
  };
});

function validateWin() {
  if (
    findWin[0] !== 0 &&
    findWin[0] == findWin[1] &&
    findWin[1] == findWin[2]
  ) {
    gameOver = true;
    if (findWin[0] == 1) {
      console.log("X ganhou!");
      message.style.display = "none";
      victory.style.display = "block";
      victory.style.backgroundColor = "#5db0ff";
      winnerSymb.style.color = "#5db0ff";
      winnerSymb.textContent = "X";
    } else {
      console.log("O ganhou!");
      message.style.display = "none";
      victory.style.display = "block";
      victory.style.backgroundColor = "#ff5d5d";
      winnerSymb.style.color = "#ff5d5d";
      winnerSymb.textContent = "O";
    }

    slots.forEach((slot) => slot.classList.remove("slotEmpty"));
    slots.forEach((slot) => slot.classList.add("slotEnded"));
  }
}

//Novo Jogo
newGame.onclick = () => {
  if (gameOver == false && totalRound !== 0) {
    newGameSure.style.display = "flex";
  } else {
    window.location.reload();
  }
};

document.addEventListener("click", (element) => {
  if (element.target.id == "newGameSure") {
    newGameSure.style.display = "none";
  }
});

yes.onclick = () => {
  window.location.reload();
};

no.onclick = () => {
  newGameSure.style.display = "none";
};
