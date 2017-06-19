let canvas, canvasContext, input, graphics;
let car, carP2, carStartX, carStartY, carP2StartX, carP2StartY, tracks, background;

/**
 * Game start
 */
window.onload = () => {
    let isGameStarted = false;
    // Initialize game elements
    loadTools();
    // Manage inputs
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    // Start game after loading
    startGame();
}

/**
 * Start game given it is loaded
 */
function startGame() {
    let setup = false;
    // Loop
    setInterval(() => {
        if (graphics.isLoadingDone()) {
            if (!setup) {
                loadGame();
                setup = true;
            }
            update();
            draw();
        }
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Startup game elements 
 * */
function loadTools() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
    background = new Background(canvas.width, canvas.height);
    // Input
    input = new Input();
    // Graphics loader
    graphics = new Graphics();
}


/**
 * Loading game elements 
 * */
function loadGame() {
    // Track
    tracks = [];
    loadTracks(graphics);
    // Data
    car = new Car(carStartX, carStartY, false, graphics);
    carP2 = new Car(carP2StartX, carP2StartY, true, graphics);
}

/**
 * Load all tracks
 */
function loadTracks(graphics) {
    let trackLeftEdgeX = 0;
    let trackTopEdgeY = 0;
    let trackIndex = 0;
    for (let i = 0; i < TRACK_ROWS; i++) { // Rows
        for (let j = 0; j < TRACK_COLS; j++) { // Columns
            // Terrain generation
            let newTrack = new Track(trackLeftEdgeX, trackTopEdgeY, TRACKGRID[trackIndex], graphics);
            tracks.push(newTrack);
            // Car start
            if (TRACKGRID[trackIndex] == TRACK_START_P1_CODE) {
                carStartX = trackLeftEdgeX + CAR_START_X_OFFSET;
                carStartY = trackTopEdgeY;
            }
            if (TRACKGRID[trackIndex] == TRACK_START_P2_CODE) {
                carP2StartX = trackLeftEdgeX + CAR_START_X_OFFSET;
                carP2StartY = trackTopEdgeY;
            }
            // For next iteration
            trackLeftEdgeX = (trackLeftEdgeX + TRACK_WIDTH) % (TRACK_COLS * TRACK_WIDTH);
            trackIndex = trackIndex + 1;
        }
        trackTopEdgeY = (trackTopEdgeY + TRACK_HEIGHT) % (TRACK_ROWS * TRACK_HEIGHT);
    }
}

/**
 * Handle key pressure
 * @param {*} e Event
 */
function keyPressed(e) {
    setKeyHoldState(e.keyCode, true);
}

/**
 * Handle key releasing
 * @param {*} e Event
 */
function keyReleased(e) {
    setKeyHoldState(e.keyCode, false);
}

/**
 * Tell Input if a virtual key is hold
 * @param {*} keyCode Which key is hold
 * @param {*} setTo Input will be set this value
 */
function setKeyHoldState(keyCode, setTo) {
    // Player 1
    if (keyCode == Z_CODE) {
        input.isPressedUp = setTo;
    }
    if (keyCode == Q_CODE) {
        input.isPressedLeft = setTo;
    }
    if (keyCode == D_CODE) {
        input.isPressedRight = setTo;
    }
    if (keyCode == S_CODE) {
        input.isPressedDown = setTo;
    }
    // Player 2
    if (keyCode == UP_CODE) {
        input.isP2PressedUp = setTo;
    }
    if (keyCode == LEFT_CODE) {
        input.isP2PressedLeft = setTo;
    }
    if (keyCode == RIGHT_CODE) {
        input.isP2PressedRight = setTo;
    }
    if (keyCode == DOWN_CODE) {
        input.isP2PressedDown = setTo;
    }
}

/**
 * Update loop
 */
function update() {
    car.update(canvas, input);
    carP2.update(canvas, input);
    // Car bouncing on track
    updateCarCollision(car);
    updateCarCollision(carP2);
    // End game reset
    if (isGoalReach(car)) {
        document.getElementById('debugText').innerHTML = "Player one WON !";
        resetGame();
    }
    if (isGoalReach(carP2)) {
        document.getElementById('debugText').innerHTML = "Player two WON !";
        resetGame();
    }
}

/**
 * Handle car colliding with tracks
 */
function updateCarCollision(checkedCar) {
    // Get checkedCar's next position
    let nextTrackRow = Math.floor(checkedCar.getNextY() / TRACK_HEIGHT);
    let nextTrackCol = Math.floor(checkedCar.getNextX() / TRACK_WIDTH);
    // Track col and row must be in config limit
    if (nextTrackCol < 0 || nextTrackRow < 0 || nextTrackRow >= TRACK_ROWS || nextTrackCol >= TRACK_COLS)
        return;
    // Collision
    let collidedTrack = getTrackFromColAndRow(nextTrackRow, nextTrackCol);
    if (collidedTrack.code == TRACK_WALL_CODE) {
        checkedCar.trackBounce();
    }
}

/**
 * Get track index from row and col
 * @param {int} trackRow 
 * @param {int} trackCol 
 */
function getTrackFromColAndRow(trackRow, trackCol) {
    return tracks[trackRow * TRACK_COLS + trackCol];
}


/**
 * Returns true when car reach track end
 */
function isGoalReach(checkedCar) {
    // Get checkedCar's position
    let nextTrackRow = Math.floor(checkedCar.y / TRACK_HEIGHT);
    let nextTrackCol = Math.floor(checkedCar.x / TRACK_WIDTH);
    // Check if goal is reach
    let currentTrack = getTrackFromColAndRow(nextTrackRow, nextTrackCol);
    return currentTrack.code == TRACK_GOAL_CODE;
}

/**
 * Reset game
 */
function resetGame() {
    car.reset(carStartX, carStartY, false, graphics);
    carP2.reset(carP2StartX, carP2StartY, true, graphics);
    tracks = [];
    loadTracks(graphics);
}


/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
    for (let j = 0; j < tracks.length; j++) {
        tracks[j].draw();
    }
    car.draw();
    carP2.draw();
}
