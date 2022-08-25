const canvas = document.getElementById('game');

const ctx = canvas.getContext('2d');

let gameSpeed = 7;
let snakeX = 10;
let snakeY = 10;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;


function drawGame(){
    clearScreen();
    drawSnake();

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



drawGame();
