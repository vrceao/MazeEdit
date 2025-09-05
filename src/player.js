
let player = {
    edit: false,
    pos: [null, null],
}

function keyPressedPlayer() {
    switch (key) {
        case "w": case "W": {
            player.pos[1]--;
            if (player.edit) return;
            if (
                player.pos[0] < 0 ||
                player.pos[1] < 0 ||
                player.pos[0] >= maze.cols ||
                player.pos[1] >= maze.rows ||
                maze.map[player.pos[1]][player.pos[0]] == 1
            ) player.pos[1]++;
            break;
        }

        case "s": case "S": {
            player.pos[1]++;
            if (player.edit) return;
            if (
                player.pos[0] < 0 ||
                player.pos[1] < 0 ||
                player.pos[0] >= maze.cols ||
                player.pos[1] >= maze.rows ||
                maze.map[player.pos[1]][player.pos[0]] == 1
            ) player.pos[1]--;
            break;
        }

        case "a": case "A": {
            player.pos[0]--;
            if (player.edit) return;
            if (
                player.pos[0] < 0 ||
                player.pos[1] < 0 ||
                player.pos[0] >= maze.cols ||
                player.pos[1] >= maze.rows ||
                maze.map[player.pos[1]][player.pos[0]] == 1
            ) player.pos[0]++;
            break;
        }

        case "d": case "D": {
            player.pos[0]++;
            if (player.edit) return;
            if (
                player.pos[0] < 0 ||
                player.pos[1] < 0 ||
                player.pos[0] >= maze.cols ||
                player.pos[1] >= maze.rows ||
                maze.map[player.pos[1]][player.pos[0]] == 1
            ) player.pos[0]--;
            break;
        }

        case "e": case "E": {
            editor();
            break;
        }

        case "k": case "K": {
            changeBlock();
            break;
        }
    }
}

function editor() {
    // Enable editor
    if (!player.edit) {
        player.edit = true;
        strokeWeight(1);
    }
    // Disable editor
    else {
        player.edit = false;
        strokeWeight(0);
    }
}