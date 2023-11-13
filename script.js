const canvas = document.querySelector('canvas');
const img = document.querySelector('img');
const ctx = canvas.getContext('2d');
const audio = document.querySelector('.audio')


let x = 20;
let y = 25;
let speedX = 0;
let speedY = 0;
let score = 0;
let isCollided = false;

let map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
  [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
  [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function createCanvas() {
  canvas.width = 500;
  canvas.height = 500;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(img, x, y, 20, 20);
  drawWall();
  drawFood();
ctx.font = "20px Arial";
ctx.fillText('score ' + score, 10, 480)
eat()
}


function NewPosition() {
  x += speedX;
  y += speedY;
}

function updateCanvas() {
  ctx.clearRect(x, y, canvas.width, canvas.height);
  NewPosition();
  createCanvas();
}

setInterval(updateCanvas, 10);

function drawWall() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(i * 20 + 1, j * 20 + 1, 20, 20);
      }
      if (map[i][j] == 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(i * 20 + -1, j * 20 + -1, 20, 20);
      }
      if(map[i][j] == 1){
        ctx.fillStyle = 'black';
        ctx.fillRect(i * 20, j * 20, 20, 20);
      }
    }
  }
}

function drawFood() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 2) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(i * 20 + 7, j * 20 + 5, 5, 5);
      }
    }
  }
}

function systemMovement() {
  document.addEventListener('keydown', (e) => {
    let key = e.keyCode;

    switch (key) {
      case 39:
        speedX = 1;
        audio.play()
        break;
      case 37:
        speedX = -1;
        audio.play()
        break;
      case 38:
        speedY = -1;
        audio.play()
        break;
      case 40:
        speedY = 1;
        audio.play()
        break;
    }
  });

  document.addEventListener('keyup', () => {
    speedX = 0;
    speedY = 0;
    audio.pause()
  });
}

function eat() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == 2 && getMapX() == i && getMapY() == j) {
        map[i][j] = 3;
        score++
      }
    }
  }
}

function getMapX(){
  let mapX = parseInt(x / 20)
  return mapX
}

function getMapY(){
  let mapY = parseInt(y / 20)
  return mapY
}

systemMovement();

// function checkCollisions() {
//   if (
//       map[parseInt(y / 20)][
//           parseInt(x / 20)
//       ] == 1 ||
//       map[parseInt(y / 20 + 0.9999)][
//           parseInt(x / 20)
//       ] == 1 ||
//       map[parseInt(y / 20)][
//           parseInt(x / 20 + 0.9999)
//       ] == 1 ||
//       map[parseInt(y / 20 + 0.9999)][
//           parseInt(x / 20 + 0.9999)
//       ] == 1
//   ) {
//       isCollided = true;
//   }
//   return isCollided;
// }
