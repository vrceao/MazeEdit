
let SPRITESHEET;

let sprites = {
    background: null,
    wall: null,
    start: null,
    end: null,
    player: null,
    edit: null
}

function preload() {
    SPRITESHEET = loadImage("../assets/spritesheet.png");
}

function setup() {
    createCanvas(maze.gridSize * maze.rows + maze.gridSize * 2, maze.gridSize * maze.cols + maze.gridSize * 2, mazeCanvas);
    colorMode(RGB, 255);

    strokeWeight(0);
    noSmooth();

    player.pos[0] = maze.start[0];
    player.pos[1] = maze.start[1];

    sprites = {
        background: SPRITESHEET.get(0, 0, 8, 8),
        wall: SPRITESHEET.get(8, 0, 8, 8),
        start: SPRITESHEET.get(16, 0, 8, 8),
        end: SPRITESHEET.get(24, 0, 8, 8),
        player: SPRITESHEET.get(32, 0, 8, 8),
        edit: SPRITESHEET.get(40, 0, 8, 8)
    }
}

function draw() {
    background(0, 0, 8);

    for (let row = 0; row < maze.map.length; row++) {
        for (let col = 0; col < maze.map[row].length; col++) {
            if (maze.map[row][col] == 0) {
                // Background
                image(sprites.background, col * maze.gridSize + maze.gridSize, row * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
            } else if (maze.map[row][col] == 1) {
                // Wall
                image(sprites.wall, col * maze.gridSize + maze.gridSize, row * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
            }
        }
    }

    // Start
    if (maze.start[0] != null && maze.start[1] != null) {
        image(sprites.start, maze.start[0] * maze.gridSize + maze.gridSize, maze.start[1] * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
    }

    // End
    if (maze.end[0] != null && maze.end[1] != null) {
        image(sprites.end, maze.end[0] * maze.gridSize + maze.gridSize, maze.end[1] * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
    }

    if (!player.edit) {
        // Player
        image(sprites.player, player.pos[0] * maze.gridSize + maze.gridSize, player.pos[1] * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
    } else {
        image(sprites.edit, player.pos[0] * maze.gridSize + maze.gridSize, player.pos[1] * maze.gridSize + maze.gridSize, maze.gridSize, maze.gridSize);
    }
}

function keyPressed() {
    keyPressedPlayer();
    keyPressedMaze();
}