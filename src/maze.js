
let maze = {
    gridSize: 64,
    rows: 8,
    cols: 8,

    map: [
        [0,0,0,0,0,1,0,0],
        [1,1,1,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [1,1,0,1,0,1,1,1],
        [0,1,0,1,0,0,0,1],
        [0,1,0,1,0,1,0,0],
        [0,1,0,1,0,1,1,1],
        [0,0,0,1,0,0,0,0]
    ],
    start: [0, 0],
    end: [7, 7]
}

function changeGridSize(resizeBy) {
    maze.gridSize += resizeBy;
    if (maze.gridSize < 1) maze.gridSize = 1;
    resizeCanvas(maze.gridSize * maze.cols + maze.gridSize * 2, maze.gridSize * maze.rows + maze.gridSize * 2, mazeCanvas);
}

function resizeMaze(axis, resizeBy) {
    if (!player.edit) return;

    // Expand
    if (resizeBy > 0) {
        if (axis == "rows") {
            for (let loop = 0; loop < resizeBy; loop++) {
                maze.rows++;
                maze.map.push([]);
                for (let col = 0; col < maze.cols; col++) {
                    maze.map[maze.rows - 1].push(0);
                }
            }
        }

        else if (axis == "cols") {
            for (let loop = 0; loop < resizeBy; loop++) {
                maze.cols++;
                for (let row = 0; row < maze.rows; row++) {
                    maze.map[row].push(0);
                }
            }
        }
    }

    // Shrink
    else {
        if (axis == "rows") {
            if (maze.rows <= 3) return;
            for (let loop = 0; loop < Math.abs(resizeBy); loop++) {
                maze.rows--;
                maze.map.pop();
            }
        }

        else if (axis == "cols") {
            if (maze.cols <= 3) return;
            for (let loop = 0; loop < Math.abs(resizeBy); loop++) {
                maze.cols--;
                for (let row = 0; row < maze.rows; row++) {
                    maze.map[row].pop();
                }
            }
        }
    }

    changeGridSize(0);
}

function changeBlock() {
    let coords = [player.pos[1], player.pos[0]];
    if (maze.map[coords[0]][coords[1]] == 0) maze.map[coords[0]][coords[1]] = 1;
    else maze.map[coords[0]][coords[1]] = 0;
}

function keyPressedMaze() {
    switch (key) {
        case "-": {
            changeGridSize(-1);
            break;
        }
        case "_": {
            changeGridSize(-10);
            break;
        }
        case "=": {
            changeGridSize(1);
            break;
        }
        case "+": {
            changeGridSize(10);
            break;
        }

        case "[": {
            resizeMaze("cols", -1);
            break;
        }
        case "{": {
            resizeMaze("cols", -10);
            break;
        }
        case "]": {
            resizeMaze("cols", 1);
            break;
        }
        case "}": {
            resizeMaze("cols", 10);
            break;
        }
        case ";": {
            resizeMaze("rows", -1);
            break;
        }
        case ":": {
            resizeMaze("rows", -10);
            break;
        }
        case "'": {
            resizeMaze("rows", 1);
            break;
        }
        case "\"": {
            resizeMaze("rows", 10);
            break;
        }
    }
}