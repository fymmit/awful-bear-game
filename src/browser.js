import * as game from './game.js';
let canvas;
let ctx;
let keyState = {};

window.onload = () => {
    canvas = document.getElementById('canvas');
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp)
    game.init();
    const fps = 30;
    setInterval(tick, 1000/fps);
}

const tick = () => {
    for (let enemy of game.enemies) {
        game.move(enemy, enemy.direction, 15)
    }
    if (keyState[37] || keyState[65]) {
        game.move(game.player, {x: -1, y: 0});
    }
    if (keyState[38] || keyState[87]) {
        game.move(game.player, {x: 0, y: -1});
    }
    if (keyState[39] || keyState[68]) {
        game.move(game.player, {x: 1, y: 0});
    }
    if (keyState[40] || keyState[83]) {
        game.move(game.player, {x: 0, y: 1});
    }
    draw();
}

const handleKeyDown = (event) => {
    keyState[event.keyCode] = true;
}

const handleKeyUp = (event) => {
    keyState[event.keyCode] = false;
}

const draw = () => {
    ctx = canvas.getContext('2d');
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawPlayField(game.playField);
    drawPlayer();
    drawEnemies();
}

const drawPlayField = (field) => {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            const square = field[i][j];
            let colour;
            switch (square.content) {
                case 'wall':
                    colour = '#333';
                    break;
                // case 'player':
                //     colour = '#0f0';
                //     break;
                case 'ground':
                    colour = '#f9f9f9';
                    break;
                // case 'enemy':
                //     colour = '#f00';
                //     break;
            }
            drawRect(square.x * 50 + 1, square.y * 50 + 1, 48, 48, colour);
        }
    }
}

const drawPlayer = () => {
    drawRect(game.player.realX, game.player.realY, game.player.size, game.player.size, '#0f0');
}

const drawEnemies = () => {
    for (let enemy of game.enemies) {
        drawRect(enemy.realX, enemy.realY, 48, 48, '#f00');
    }
}

const drawRect = (x, y, w, h, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}
