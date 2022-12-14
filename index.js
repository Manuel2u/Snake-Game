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
let gameSpeed = 2;
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
    changePosition();
    let result = isgameOver();
    if (result) {
        return;
    }
    clearScreen();
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
    if (snakePart.length > snaketail) {
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

// Mobile support
document.addEventListener('click', function (event) {
    if (event.target.id === 'left') {
        if (xVelocity === 1) {
            return;
        }
        xVelocity = -1;
        yVeloctiy = 0;
    }
    if (event.target.id === 'up') {
        if (yVeloctiy === 1) {
            return;
        }
        yVeloctiy = -1;
        xVelocity = 0;
    }
    if (event.target.id === 'right') {
        if (xVelocity === -1) {
            return;
        }
        xVelocity = 1;
        yVeloctiy = 0;
    }
    if (event.target.id === 'down') {
        if (yVeloctiy === -1) {
            return;
        }
        yVeloctiy = 1;
        xVelocity = 0;
    }
}
);


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
        gameSpeed++;
        console.log(snaketail);
    }
}

function gameScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score : ' + score, 305, 20);
}



function isgameOver() {
    let gameOver = false;

    if (xVelocity === 0 && yVeloctiy === 0) {
        return false;
    }

    if (snakeX < 0) {
        gameOver = true;
    } else if (snakeX === tileCount) {
        gameOver = true;
    } else if (snakeY === tileCount) {
        gameOver = true;
    } else if (snakeY < 0) {
        gameOver = true;
    }

    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        if (snakeX === part.x && snakeY === part.y) {
            gameOver = true;
            break;
        }
    }


    if (gameOver) {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Game Over !', 75, 200);
        

        
        let audio = new Audio('sounds/gameOver.wav');
        audio.play();

        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    return gameOver;

}



drawGame();