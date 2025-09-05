
function setup() {
    createCanvas(maze.gridSize * maze.rows + maze.gridSize * 2, maze.gridSize * maze.cols + maze.gridSize * 2, mazeCanvas);
    colorMode(RGB, 255);
    stroke(128, 128, 128)
    strokeWeight(0);
    player.pos[0] = maze.start[0];
    player.pos[1] = maze.start[1];
}

function draw() {
    background(0, 0, 0);

    for (let col = 0; col < maze.map.length; col++) {
        for (let row = 0; row < maze.map[col].length; row++) {
            if (maze.map[col][row] == 0) fill(255, 255, 255);
            else if (maze.map[col][row] == 1) fill(0, 0, 0, 255);
            square(
                row * maze.gridSize + maze.gridSize,
                col * maze.gridSize + maze.gridSize,
                maze.gridSize
            );
        }
    }

    // Start
    fill(0, 255, 0);
    square(
        maze.start[0] * maze.gridSize + maze.gridSize,
        maze.start[1] * maze.gridSize + maze.gridSize,
        maze.gridSize
    );

    // End
    fill(255, 0, 0);
    square(
        maze.end[0] * maze.gridSize + maze.gridSize,
        maze.end[1] * maze.gridSize + maze.gridSize,
        maze.gridSize
    );

    // Player
    fill(0, 0, 255);
    square(
        player.pos[0] * maze.gridSize + maze.gridSize,
        player.pos[1] * maze.gridSize + maze.gridSize,
        maze.gridSize
    );
}

function keyPressed() {
    keyPressedPlayer();
    keyPressedMaze();
}