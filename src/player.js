
let player = {
    edit: false,
    pos: [null, null],
}

function checkForCollision() {
    let collided = false;

    if (
        player.pos[0] < 0 ||
        player.pos[1] < 0 ||
        player.pos[0] >= maze.cols ||
        player.pos[1] >= maze.rows
    ) collided = true;

    if (!player.edit && !collided) {
        if (maze.map[player.pos[1]][player.pos[0]] == 1) collided = true
    }

    return collided;
}

function keyPressedPlayer() {
    switch (key) {
        case "w": case "W": {
            player.pos[1]--;
            if (checkForCollision()) player.pos[1]++;
            break;
        }

        case "s": case "S": {
            player.pos[1]++;
            if (checkForCollision()) player.pos[1]--;
            break;
        }

        case "a": case "A": {
            player.pos[0]--;
            if (checkForCollision()) player.pos[0]++;
            break;
        }

        case "d": case "D": {
            player.pos[0]++;
            if (checkForCollision()) player.pos[0]--;
            break;
        }

        case "e": case "E": {
            editor();
            break;
        }
    }
}

function editor() {
    // Enable editor
    if (!player.edit) {
        player.edit = true;
    }
    // Disable editor
    else {
        // Make it unable to exit edit mode if there's no start/end
        // if (maze.start[0] == null || maze.start[1] == null || maze.end[0] == null || maze.end[1] == null) return;
        player.edit = false;
    }
}