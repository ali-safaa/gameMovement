let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let x = 0;
let y = 0;
let speedX = 0;
let speedY = 0;

function createCanvas() {
  canvas.width = 300;
  canvas.height = 300;

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(x, y, 30, 30);
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

setInterval(updateCanvas, 20);

function systemMovement() {
  document.addEventListener('keydown', (e) => {
    let key = e.keyCode;

    switch (key) {
      case 39:
        speedX = 1;
        console.log(speedX);
        break;
      case 37:
        speedX = -1;
        console.log(speedX);
        break;
      case 38:
        speedY = -1;
        console.log(speedY);
        break;
      case 40:
        speedY = 1;
        console.log(speedY);
        break;
    }
  });

  document.addEventListener('keyup', () => {
    speedX = 0;
    speedY = 0;
  });
}

systemMovement();
