export const playField = [];
export let player;
export let enemies = [];
const levelName = 'level1';

// export const move = (character, direction) => {
//     const old = {
//         x: character.x,
//         y: character.y
//     }
//     if (playField[character.x + direction.x][character.y + direction.y].content == 'wall') {
//         if (character.type == 'enemy') {
//             character.direction.x *= -1;
//             character.direction.y *= -1;
//             character.x += direction.x;
//             character.y += direction.y;
//         }
//     } else {
//         character.x += direction.x;
//         character.y += direction.y;
//     }
//     updatePlayField(old, character);
// }

export const move = (character, direction, velocity = 5) => {
    // if (!(playField[Math.floor(character.realX / 50)][Math.floor(character.realY / 50)].content == 'wall')) {
        const newX = character.realX + direction.x * velocity;
        const newY = character.realY + direction.y * velocity;
        if (playField[Math.floor(newX / 50)][Math.floor(newY / 50)].content != 'wall'
            && playField[Math.floor((newX + character.size) / 50)][Math.floor(newY / 50)].content != 'wall'
            && playField[Math.floor(newX / 50)][Math.floor((newY + character.size) / 50)].content != 'wall'
            && playField[Math.floor((newX + character.size) / 50)][Math.floor((newY + character.size) / 50)].content != 'wall') {
            character.realX = newX;
            character.realY = newY;
            character.x = Math.floor(character.realX / 50);
            character.y = Math.floor(character.realY / 50);
        } else if (character.type === 'enemy') {
            character.direction.x = -character.direction.x;
            character.direction.y = -character.direction.y;
        }

        // if (playField[character.x][character.y].content == 'wall'
        //     || playField[character.x][Math.floor((character.realY + character.size) / 50)].content == 'wall') {
        //     character.x += -direction.x;
        //     character.realX = character.x * 50 + 1;
        // }
        // if (playField[Math.floor((character.realX + character.size) / 50)][character.y].content == 'wall'
        //     || playField[Math.floor((character.realX + character.size) / 50)][Math.floor((character.realY + character.size) / 50)].content == 'wall') {
        //     character.realX = character.x * 50 + 9;
        // }
        // if (playField[character.x][character.y].content == 'wall'
        //     || playField[Math.floor((character.realX + character.size) / 50)][character.y].content == 'wall') {
        //     character.y += -direction.y;
        //     character.realY = character.y * 50 + 1;
        // }
        // if (playField[character.x][Math.floor((character.realY + character.size) / 50)].content == 'wall') {
        //     character.realY = character.y * 50 + 9;
        // }

        console.log(character);
    // }
}

export const tick = () => {
    updatePlayField();
}

const updatePlayField = (old, character) => {
    playField[old.x][old.y].content = 'ground';
    playField[character.x][character.y].content = character.type;
}

export const init = () => {
    createLevel();
    // for (let i = 0; i < 16; i++) {
    //     playField.push(new Array());
    //     for (let j = 0; j < 12; j++) {
    //         let content;
    //         if (player.x == i && player.y == j) {
    //             content = 'player';
    //         } else {
    //             content = Math.random() > 0.8 ? 'wall' : 'ground';
    //         }
    //         playField[i].push({
    //             x: i,
    //             y: j,
    //             content
    //         });
    //     }
    // }
}

const createLevel = () => {
    fetch(`./levels/${levelName}.txt`)
        .then(res => res.text())
        .then(level => {
            for (let i = 0; i < level.length; i++) {
                const x = i % 16;
                const y = Math.floor(i / 16);
                const square = playField[x][y];
                switch (level[i]) {
                    case 'w':
                        square.content = 'wall';
                        break;
                    case '.':
                        square.content = 'ground';
                        break;
                    case 'p':
                        square.content = 'player';
                        player = {
                            type: 'player',
                            x,
                            y,
                            realX: x * 50 + 1,
                            realY: y * 50 + 1,
                            size: 48
                        };
                        break;
                    case 'l':
                        square.content = 'enemy';
                        enemies.push({
                            type: 'enemy',
                            x,
                            y,
                            realX: x * 50 + 1,
                            realY: y * 50 + 1,
                            size: 48,
                            direction: {x: -1, y: 0}
                        })
                        break;
                    case 'r':
                        square.content = 'enemy';
                        enemies.push({
                            type: 'enemy',
                            x,
                            y,
                            realX: x * 50 + 1,
                            realY: y * 50 + 1,
                            size: 48,
                            direction: {x: 1, y: 0}
                        })
                        break;
                    case 'u':
                        square.content = 'enemy';
                        enemies.push({
                            type: 'enemy',
                            x,
                            y,
                            realX: x * 50 + 1,
                            realY: y * 50 + 1,
                            size: 48,
                            direction: {x: 0, y: -1}
                        })
                        break;
                    case 'd':
                        square.content = 'enemy';
                        enemies.push({
                            type: 'enemy',
                            x,
                            y,
                            realX: x * 50 + 1,
                            realY: y * 50 + 1,
                            size: 48,
                            direction: {x: 0, y: 1}
                        })
                        break;
                }
            }
        });
    for (let i = 0; i < 16; i++) {
        playField.push(new Array());
        for (let j = 0; j < 12; j++) {
            let content = Math.random() > 0.8 ? 'wall' : 'ground';
            playField[i].push({
                x: i,
                y: j,
                content
            });
        }
    }
}
