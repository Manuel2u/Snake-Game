const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

class Snakepart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


let snakePart = [];
let snaketail = 0;
let gameSpeed = 5;
let snakeX = 10;
let snakeY = 10;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let foodX = 10;
let foodY = 8;
let score = 0;
let xVelocity = 0;
let yVeloctiy = 0;


function drawGame() {
    clearScreen();
    changePosition();
    drawFood();
    generateFood();
    gameScore();
    drawSnake();


    setTimeout(drawGame, 1000 / gameSpeed);
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

    ctx.fillStyle = "green";
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakePart.push(new Snakepart(snakeX, snakeY));
    if(snakePart.length > snaketail){
        snakePart.shift();
    }


    ctx.fillStyle = 'orange';
    ctx.fillRect(snakeX * tileCount, snakeY * tileCount, tileSize, tileSize);

}

function changePosition() {
    snakeX = snakeX + xVelocity;
    snakeY = snakeY + yVeloctiy;
}

document.addEventListener('keydown', function (event) {
    //Left
    if (event.keyCode === 37) {
        if (xVelocity === 1) {
            return;
        }
        xVelocity = -1;
        yVeloctiy = 0;
    }
    //Up
    if (event.keyCode === 38) {
        if (yVeloctiy === 1) {
            return;
        }
        yVeloctiy = -1;
        xVelocity = 0;
    }
    //Right
    if (event.keyCode === 39) {
        if (xVelocity === -1) {
            return;
        }
        xVelocity = 1;
        yVeloctiy = 0;
    }
    //Down
    if (event.keyCode == 40) {
        if (yVeloctiy === -1) {
            return;
        }
        yVeloctiy = 1;
        xVelocity = 0;
    }

});


function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function generateFood() {
    if (foodX === snakeX && foodY === snakeY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        score++;
        snaketail++;
        console.log(snaketail);
    }
}

function gameScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score : ' + score, 305, 20);
}



drawGame();