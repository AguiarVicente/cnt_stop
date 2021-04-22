import positionBall from "./position.js";

const canvas = document.querySelector("canvas");
const frame = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 1200;

const img = document.querySelector("img");

function loadImage() {
  frame.drawImage(img, 5, 60, 800, 800);
}

const position = {
  posX: 0,
  posY: 0,
};

function createDisk(x, y, r, colorBall, colorShadow) {
  frame.beginPath();
  frame.shadowColor = colorShadow;
  frame.shadowBlur = 8;
  // frame.shadowOffsetX = 2;
  // frame.shadowOffsetY = 2;
  frame.arc(x, y, r, 0, Math.PI * 2, true);
  frame.fillStyle = colorBall;
  frame.fill();
  frame.closePath();
}

function buttonPlayDice() {
  frame.fillStyle = "#369";
  frame.font = "25px serif";
  frame.fillRect(canvas.width - 350, canvas.height - 1140, 150, 50);
  frame.fillStyle = "#fff";
  frame.fillText("Continuar", 870, 95, 250);
}

function buttonExit(x1, x2, y1, y2, c1, c2, c3, c4) {
  frame.fillStyle = "#369";
  frame.font = "25px serif";
  frame.fillRect(canvas.width - 195, 60, 150, 50);
  frame.fillStyle = "#fff";
  frame.fillText("Parar", 1060, 95, 250);

  canvas.addEventListener("click", (event) => {
    if (
      event.offsetX >= x1 &&
      event.offsetX <= x2 &&
      event.offsetY >= y1 &&
      event.offsetY <= y2
    ) {
      frame.clearRect(c1, c2, c3, c4)
    }
  });
}

const moveMarcs = {
  posicaoX: 0,
  posicaoY: 0,
  directionX: 0,
  directionY: 0,
  marc0: 0,
  marc1: 0,
  marc2: 0,
};

let value1 = 0;
let value2 = 0;
let value3 = 0;
let value4 = 0;

const luckDice = () => {
  canvas.addEventListener("click", (event) => {
    let x = event.offsetX;
    let y = event.offsetY;
    value1 = randomBall();
    value2 = randomBall();
    value3 = randomBall();
    value4 = randomBall();

    if (x >= 850 && x <= 1000 && y >= 60 && y <= 120) {
      createDice(850, 150, 100, 100, 10, value1);
      createDice(1050, 150, 100, 100, 10, value2);
      createDice(850, 350, 100, 100, 10, value3);
      createDice(1050, 350, 100, 100, 10, value4);
      combine(value1, value2, value3, value4);
    }
  });
};

let ball = {
  ball1: 0,
  ball2: 0,
  ball3: 0
}

console.log(ball);

function selectionDice() {
  canvas.addEventListener("click", (event) => {
    let x = event.offsetX;
    let y = event.offsetY;

    if (x > 850 && x < 900 && y > 580 && y < 610) {
      moveMarcs.posicaoX++;
      moveMarcs.posicaoY++;

      ball.ball1 = value1 + value2
      ball.ball2 = value3 + value4
      console.log(ball);

      moveMarcs.marc0 = value1 + value2;
      moveMarcs.marc1 = value3 + value4;

      createBall(
        positionBall[`${value1 + value2}`][moveMarcs.directionX].x,
        positionBall[`${value1 + value2}`][moveMarcs.directionY].y,
        15,
        "black"
      );
      createBall(
        positionBall[`${value3 + value4}`][moveMarcs.directionX].x,
        positionBall[`${value3 + value4}`][moveMarcs.directionY].y,
        15,
        "black"
      );
    }

    if (x > 850 && x < 900 && y > 630 && y < 650) {
      moveMarcs.posicaoX++;
      moveMarcs.posicaoY++;

      moveMarcs.marc0 = value4 + value2;
      moveMarcs.marc1 = value3 + value1;

      createBall(
        positionBall[`${value4 + value2}`][moveMarcs.directionX].x,
        positionBall[`${value4 + value2}`][moveMarcs.directionY].y,
        15,
        "black"
      );
      createBall(
        positionBall[`${value3 + value1}`][moveMarcs.directionX].x,
        positionBall[`${value3 + value1}`][moveMarcs.directionY].y,
        15,
        "black"
      );
    }
    if (x > 850 && x < 900 && y > 680 && y < 710) {
      moveMarcs.posicaoX++;
      moveMarcs.posicaoY++;

      moveMarcs.marc0 = value3 + value2;
      moveMarcs.marc1 = value4 + value1;

      createBall(
        positionBall[`${value3 + value2}`][moveMarcs.directionX].x,
        positionBall[`${value3 + value2}`][moveMarcs.directionY].y,
        15,
        "black"
      );
      createBall(
        positionBall[`${value4 + value1}`][moveMarcs.directionX].x,
        positionBall[`${value4 + value1}`][moveMarcs.directionY].y,
        15,
        "black"
      );
    }

    buttonExit(850, 900, 580, 710, 850, 150, 300, 570);
  });
}
selectionDice();

function combine(value1, value2, value3, value4) {
  frame.clearRect(840, 550, 350, 450);
  frame.fillStyle = "#fff";
  frame.fillText("Selecione as opções abaixo", 850, 550, 250);
  frame.fillText(`${value1 + value2} e ${value3 + value4}`, 850, 600, 100);
  frame.fillText(`${value4 + value2} e ${value3 + value1}`, 850, 650, 100);
  frame.fillText(`${value3 + value2} e ${value4 + value1}`, 850, 700, 100);
}

function randomBall() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function createBall(x, y, r, colorBall) {
  frame.beginPath();
  frame.fillStyle = colorBall || "#000";
  frame.arc(x, y, r, 0, Math.PI * 2);
  frame.stroke();
  frame.fill();
  frame.closePath();
}

function createDice(x, y, w, h, raio, bola) {
  frame.shadowBlur = 0;
  frame.fillStyle = "#eaeaea";
  frame.fillRect(x, y, w, h);
  switch (bola) {
    case 1:
      createBall(x + w / 2, y + h / 2, raio);
      break;
    case 2:
      createBall(x + w - 85, y + h - 85, raio);
      createBall(x + w - 15, y + h - 15, raio);
      break;
    case 3:
      createBall(x + w - 85, y + h - 85, raio);
      createBall(x + w / 2, y + h / 2, raio);
      createBall(x + w - 15, y + h - 15, raio);
      break;
    case 4:
      createBall(x + w - 85, y + h - 85, raio);
      createBall(x + w - 85, y + h - 15, raio);
      createBall(x + w - 15, y + h - 85, raio);
      createBall(x + w - 15, y + h - 15, raio);
      break;
    case 5:
      createBall(x + w - 85, y + h - 85, raio);
      createBall(x + w - 85, y + h - 15, raio);
      createBall(x + w / 2, y + h / 2, raio);
      createBall(x + w - 15, y + h - 85, raio);
      createBall(x + w - 15, y + h - 15, raio);
      break;
    case 6:
      createBall(x + w - 85, y + h - 85, raio);
      createBall(x + w - 85, y + h - 50, raio);
      createBall(x + w - 85, y + h - 15, raio);
      createBall(x + w - 15, y + h - 85, raio);
      createBall(x + w - 15, y + h - 50, raio);
      createBall(x + w - 15, y + h - 15, raio);
  }
}

function stop(){
  buttonExit(1005, 1155, 60, 120, 850, 150, 300, 570);
}

stop()
loadImage();
buttonPlayDice();

luckDice();
