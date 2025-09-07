
let maze = {
    // Visual grid size of the maze
    gridSize: 64,
    // Number of maze rows
    rows: 8,
    // Number of maze columns
    cols: 8,

    // Array map of the maze
    // Access it using maze.map[y][x]
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
    // Start position (x, y)
    start: [0, 0],
    // End position (x, y)
    end: [7, 7]
}

let mazeHistory = []

function changeGridSize(resizeBy) {
    // Save the old grid size
    let gridSizeOld = maze.gridSize
    // Update the grid size
    maze.gridSize += resizeBy;
    // Revert the grid size when its lower than 1
    if (maze.gridSize < 1) maze.gridSize = gridSizeOld;
    // Resize the canvas
    resizeCanvas(maze.gridSize * maze.cols + maze.gridSize * 2, maze.gridSize * maze.rows + maze.gridSize * 2, mazeCanvas);
}

function resizeMaze(axis, resizeBy) {
    // Return when not in edit mode
    if (!player.edit) return;

    // Expand the maze
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

    // Shrink the maze
    else {
        if (axis == "rows") {
            for (let loop = 0; loop < Math.abs(resizeBy); loop++) {
                if (maze.rows <= 3) { changeGridSize(0);  return };
                maze.rows--;
                maze.map.pop();
            }
        }
        
        else if (axis == "cols") {
            for (let loop = 0; loop < Math.abs(resizeBy); loop++) {
                if (maze.cols <= 3) { changeGridSize(0);  return };
                maze.cols--;
                for (let row = 0; row < maze.rows; row++) {
                    maze.map[row].pop();
                }
            }
        }

        if (maze.start[0] >= maze.cols || maze.start[1] >= maze.rows) maze.start = [null, null];
        if (maze.end[0] >= maze.cols || maze.end[1] >= maze.rows) maze.end = [null, null];
    }

    // Update the grid size
    changeGridSize(0);
    // Save the maze
    saveMaze();
}

function changeBlock(block) {
    // Return when not in edit mode
    if (!player.edit) return;

    // Set function variables
    let coords = {
        // Current position related to player position
        pos: [player.pos[0], player.pos[1]],
        // Current position related to the maze map
        map: [player.pos[1], player.pos[0]]
    }

    if (block == "wall") {
        // Return when start is on the same tile
        if (maze.start[0] == coords.pos[0] && maze.start[1] == coords.pos[1]) return;
        // Return when end is on the same tile
        if (maze.end[0] == coords.pos[0] && maze.end[1] == coords.pos[1]) return;

        if (maze.map[coords.map[0]][coords.map[1]] == 0) maze.map[coords.map[0]][coords.map[1]] = 1;
        else maze.map[coords.map[0]][coords.map[1]] = 0;
    }

    // Changing the start position
    else if (block == "start") {
        // Return when end is on the same tile
        if (maze.end[0] == coords.pos[0] && maze.end[1] == coords.pos[1]) return;
        // Return when theres a wall on the same tile
        if (maze.map[coords.map[0]][coords.map[1]] == 1) return;
        // Remove the start if player is standing on it
        if (maze.start[0] == coords.pos[0] && maze.start[1] == coords.pos[1]) maze.start = [null, null];
        // Set the new start position
        else maze.start = coords.pos;
    }

    // Changing the end position
    else if (block == "end") {
        // Return when start is on the same tile
        if (maze.start[0] == coords.pos[0] && maze.start[1] == coords.pos[1]) return;
        // Return when theres a wall on the same tile
        if (maze.map[coords.map[0]][coords.map[1]] == 1) return;
        // Remove the end if player is standing on it
        if (maze.end[0] == coords.pos[0] && maze.end[1] == coords.pos[1]) maze.end = [null, null];
        // Set the new end position
        else maze.end = coords.pos;
    }

    // Save the maze
    saveMaze();
}

function clearMaze() {
    // Return when not in edit mode
    if (!player.edit) return;

    for (let row = 0; row < maze.map.length; row++) {
        for (let col = 0; col < maze.map[row].length; col++) {
            maze.map[row][col] = 0;
        }
    }

    maze.start = [null, null];
    maze.end = [null, null];
}

function saveMaze() {
    return;
    mazeHistory.push(maze);
}

function undo() {
    return;
    // Return when not in edit mode
    if (!player.edit) return;

    maze = mazeHistory[mazeHistory.length - 1];
    mazeHistory.pop();
}

function keyPressedMaze() {
    switch (key) {
        case "-": {
            changeGridSize(-8);
            break;
        }
        case "_": {
            changeGridSize(-1);
            break;
        }
        case "=": {
            changeGridSize(8);
            break;
        }
        case "+": {
            changeGridSize(1);
            break;
        }

        case "[": {
            resizeMaze("cols", -1);
            break;
        }
        case "{": {
            resizeMaze("cols", -8);
            break;
        }
        case "]": {
            resizeMaze("cols", 1);
            break;
        }
        case "}": {
            resizeMaze("cols", 8);
            break;
        }
        case ";": {
            resizeMaze("rows", -1);
            break;
        }
        case ":": {
            resizeMaze("rows", -8);
            break;
        }
        case "'": {
            resizeMaze("rows", 1);
            break;
        }
        case "\"": {
            resizeMaze("rows", 8);
            break;
        }

        case "k": case "K": {
            changeBlock("wall");
            break;
        }
        case "c": case "C": {
            clearMaze();
            break;
        }
        case "u": case "U": {
            undo();
            break;
        }

        case "1": {
            changeBlock("start");
            break;
        }
        case "2": {
            changeBlock("end");
            break;
        }
    }
}