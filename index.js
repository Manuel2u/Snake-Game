const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

let gameSpeed = 7;
let snakeX = 10;
let snakeY = 10;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let foodX = 10;
let foodY = 8;
let score = 0;


function drawGame(){
    clearScreen();
    drawSnake();
    drawFood();
    generateFood();
    gameScore();

    setTimeout(drawGame, 1000/gameSpeed);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(snakeX * tileCount, snakeY * tileCount, tileSize, tileSize);
}

document.addEventListener('keydown', function(event){
    if(event.keyCode == 37 && snakeX > 0){
        snakeX--;
    }
    if(event.keyCode == 38 && snakeY > 0){
        snakeY--;
    }
    if(event.keyCode == 39 && snakeX < tileCount - 1){
        snakeX++;
    }
    if(event.keyCode == 40 && snakeY < tileCount - 1){
        snakeY++;
    }

});


function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function generateFood(){
    if(foodX == snakeX && foodY == snakeY){
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        score++;
    }
}

function gameScore(){
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score : ' + score, 305, 20);
}
    



drawGame();
