const startBtn = document.querySelector(".start-btn"),
  container = document.querySelector(".container"),
  drawingBoard = document.querySelector(".drawing-board");
(canvas = document.querySelector(".drawing-board canvas")),
  (ctx = canvas.getContext("2d")),
  (clearCanvas = document.querySelector(".clear-canvas")),
  ((openNotes = document.querySelector(".open-notes")),
  (closeNotes = document.querySelector(".close-notes")),
  (notes = document.querySelectorAll(".note")));

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

let isDrawing = false,
  brushWidth = 3;
const startdrawing = () => {
  isDrawing = true;
  ctx.beginPath();
};

const drawing = (e) => {
  if (!isDrawing) return;
  brushWidth = document.querySelector(".tool input").value;
  ctx.lineWidth = brushWidth;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const stopdrawing = () => {
  isDrawing = false;
};

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", startdrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopdrawing);

startBtn.addEventListener("click", () => {
  container.innerHTML = pages.mathOptionPage;
  mathOptions();
});

function mathOptions() {
  const mathOptionBtn = document.querySelectorAll(".opsi");
  mathOptionBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("penjumblahan")) {
        container.innerHTML = pages.btnLevels;
        levelsOptions(10, 100, 500, "penjumblahan");
      } else if (btn.classList.contains("pengurangan")) {
        container.innerHTML = pages.btnLevels;
        levelsOptions(10, 100, 500, "pengurangan");
      } else if (btn.classList.contains("perkalian")) {
        container.innerHTML = pages.btnLevels;
        levelsOptions(10, 50, 250, "perkalian");
      } else if (btn.classList.contains("pembagian")) {
        container.innerHTML = pages.btnLevels;
        levelsOptions(10, 50, 250, "pembagian");
      }
    });
  });
}

let hearts = 0;
function healthCheck(val) {
  const healthBox = document.querySelector(".health");
  for (let i = 0; i < val; i++) {
    healthBox.innerHTML += "<i>❤️</i>";
  }
  hearts = val;
}

function healthUpdate() {
  const healthBox = document.querySelector(".health");
  healthBox.innerHTML = "";
  for (let i = 0; i < hearts; i++) {
    healthBox.innerHTML += "<i>❤️</i>";
  }
}

function levelsOptions(easy, medium, hard, operationType) {
  const levels = document.querySelectorAll(".level");
  levels.forEach((level) => {
    level.addEventListener("click", () => {
      if (level.classList.contains("mudah")) {
        container.innerHTML = pages.mainPage;
        getValues(easy, operationType, "mudah");
        check(easy, operationType, "mudah");
        healthCheck(7);
      } else if (level.classList.contains("sedang")) {
        container.innerHTML = pages.mainPage;
        getValues(medium, operationType, "sedang");
        check(medium, operationType, "sedang");
        healthCheck(5);
      } else if (level.classList.contains("susah")) {
        container.innerHTML = pages.mainPage;
        getValues(hard, operationType, "susah");
        check(hard, operationType, "susah");
        healthCheck(3);
      }
    });
  });
}

let result = 0;
function getValues(val, operationType, description) {
  const valueA = document.querySelector(".valueA"),
    valueB = document.querySelector(".valueB"),
    operation = document.querySelector(".operation"),
    descriptionLevel = document.querySelector(".des-level h2"),
    screenMath = document.querySelector(".screen-math");
  (screenValueA = screenMath.querySelector(".valueA")),
    (screenValueB = screenMath.querySelector(".valueB")),
    (screenOperation = screenMath.querySelector(".operation"));

  let getValueA = Math.floor(Math.random() * val),
    getValueB = Math.floor(Math.random() * val);
  if (operationType === "pembagian") {
    if (description === "mudah") {
      getValueB = Math.floor(Math.random() * 5);
    } else if (description === "sedang") {
      getValueB = Math.floor(Math.random() * 10);
    } else {
      getValueB = Math.floor(Math.random() * 50);
    }
  }

  valueA.innerHTML = getValueA;
  valueB.innerHTML = getValueB;
  screenValueA.innerHTML = getValueA;
  screenValueB.innerHTML = getValueB;
  if (operationType === "penjumblahan") {
    result = getValueA + getValueB;
    operation.innerHTML = "+";
    screenOperation.innerHTML = "+";
    descriptionLevel.innerHTML = `Level ${description}`;
  } else if (operationType === "pengurangan") {
    result = getValueA - getValueB;
    operation.innerHTML = "-";
    screenOperation.innerHTML = "-";
    descriptionLevel.innerHTML = `Level ${description}`;
  } else if (operationType === "perkalian") {
    result = getValueA * getValueB;
    operation.innerHTML = "x";
    screenOperation.innerHTML = "x";
    descriptionLevel.innerHTML = `Level ${description}`;
  } else {
    let num = getValueA / getValueB;
    result = parseFloat(num.toFixed(2));
    operation.innerHTML = ":";
    screenOperation.innerHTML = ":";
    descriptionLevel.innerHTML = `Level ${description}`;
  }
  if (this.innerWidth <= 600) {
    openNotes.style.display = "block";
  }
}

notes.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.classList.contains("open-notes")) {
      drawingBoard.style.transform = "translateY(0)";
      closeNotes.style.display = "block";
    } else {
      drawingBoard.style.transform = "translateY(100%)";
      e.style.display = "none";
    }
  });
});

const notificationCheck = {
  color: ["red", "green", "#3F497F"],
  move: "-60px",
  notificationUp(val) {
    const notification = document.querySelector(".notif");
    const notificationMessage = document.querySelector(".notif h3");
    if (val === "") {
      notification.style.marginTop = this.move;
      notificationMessage.style.color = this.color[2];
      notificationMessage.innerText = "Jawaban kosong euy";
    } else if (val === "Benar") {
      notification.style.marginTop = this.move;
      notificationMessage.style.color = this.color[1];
      notificationMessage.innerText = "Jawaban kamu benar euy";
    } else {
      notification.style.marginTop = this.move;
      notificationMessage.style.color = this.color[0];
      notificationMessage.innerText = "Jawaban kamu salah euy";
    }
  },
  notificationDown() {
    setTimeout(() => {
      const notification = document.querySelector(".notif");
      notification.style.marginTop = "-10px";
    }, 1000);
  },
};

let score = 0;
function scoreUpdate() {
  score++;
  const scoreValue = document.querySelector(".score .score-value");
  scoreValue.innerHTML = score;
}

const inputUpdate = () => {
  let input = document.querySelector("input");
  input.value = "";
};

function check(val, operationType, description) {
  const btnCheck = document.querySelector(".btn-check");
  btnCheck.addEventListener("click", () => {
    const input = document.querySelector(".form input").value;
    if (input === "") {
      notificationCheck.notificationUp("");
      notificationCheck.notificationDown();
    } else if (result == input) {
      scoreUpdate();
      notificationCheck.notificationUp("Benar");
      notificationCheck.notificationDown();
      inputUpdate();
      getValues(val, operationType, description);
    } else if (result !== input) {
      notificationCheck.notificationUp("Salah");
      notificationCheck.notificationDown();
      inputUpdate();
      hearts -= 1;
      healthUpdate();
      if (hearts === 0) {
        container.innerHTML = pages.gameOverPage;
        openNotes.style.display = "none";

        const startAgainBtn = document.querySelector(".game-over button");
        setTimeout(() => {
          startAgainBtn.style.transform = "scale(1)";
        }, 2000);
        startAgainBtn.addEventListener("click", function () {
          container.innerHTML = pages.mathOptionPage;
          mathOptions();
        });
      }
    }
  });
}

const pages = {
  mathOptionPage: `
  <div class="notif">
    <h3>Jawaban kamu benar!</h3>
  </div>
  <div class="math-options">
   <button class="opsi penjumblahan">Penjumblahan</button>
   <button class="opsi pengurangan">Pengurangan</button>
   <button class="opsi perkalian">Perkalian</button>
   <button class="opsi pembagian">Pembagian</button>
</div>`,
  btnLevels: `
  <div class="notif">
    <h3>Jawaban kamu benar!</h3>
  </div>
  <div class="btn-levels">
<button class="level mudah">Mudah</button>
<button class="level sedang">Sedang</button>
<button class="level susah">Susah</button>
</div>`,
  mainPage: `
  <div class="notif">
    <h3>Jawaban kamu benar!</h3>
  </div>
  <div class="jumblah">
<div class="des-level">
    <h2></h2>
</div>
<div class="health"> 
</div>
<div class="value">
    <h2 class="valueA"></h2>
    <h2 class="operation"></h2>
    <h2 class="valueB"></h2>
</div>
<div class="form">
    <input type="number">
    <button class="btn-check"">Cek</button>
    <div class="score">
        <h3>Score</h3>
        <h3 class="score-value">0</h3>
    </div>
</div>
</div>`,
  gameOverPage: `
  <div class="notif">
    <h3>Jawaban kamu benar!</h3>
  </div>
  <div class="game-over">
  <h2>Game Over</h2>
  <button class="start-btn">Mulai lagi?</button>
</div>`,
};
