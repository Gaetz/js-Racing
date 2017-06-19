let canvas, canvasContext, input, graphics;
let car, carStartX, carStartY, tracks, background;

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
    car = new Car(carStartX, carStartY, graphics);
}

/**
 * Load all tracks
 */
function loadTracks(graphics) {
    for (let i = 0; i < TRACK_ROWS; i++) { // Rows
        for (let j = 0; j < TRACK_COLS; j++) { // Columns
            // Terrain generation
            let newTrack = new Track(j * TRACK_WIDTH, i * TRACK_HEIGHT, TRACKGRID[i * TRACK_COLS + j], graphics);
            tracks.push(newTrack);
            // Car start
            if (TRACKGRID[i * TRACK_COLS + j] == TRACK_START_CODE) {
                carStartX = j * TRACK_WIDTH;
                carStartY = i * TRACK_HEIGHT;
            }
        }
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
    if (keyCode == UP_CODE || keyCode == Z_CODE) {
        input.isPressedUp = setTo;
    }
    if (keyCode == LEFT_CODE || keyCode == Q_CODE) {
        input.isPressedLeft = setTo;
    }
    if (keyCode == RIGHT_CODE || keyCode == D_CODE) {
        input.isPressedRight = setTo;
    }
    if (keyCode == DOWN_CODE || keyCode == S_CODE) {
        input.isPressedDown = setTo;
    }
}

/**
 * Update loop
 */
function update() {
    car.update(canvas, input);
    // Car bouncing on track
    updateCarCollision();
    // End game reset
    if (isGoalReach()) {
        resetGame();
    }
}

/**
 * Handle car colliding with tracks
 */
function updateCarCollision() {
    // Get car's next position
    let nextTrackRow = Math.floor(car.getNextY() / TRACK_HEIGHT);
    let nextTrackCol = Math.floor(car.getNextX() / TRACK_WIDTH);
    // Track col and row must be in config limit
    if (nextTrackCol < 0 || nextTrackRow < 0 || nextTrackRow >= TRACK_ROWS || nextTrackCol >= TRACK_COLS)
        return;
    // Collision
    let collidedTrack = getTrackFromColAndRow(nextTrackRow, nextTrackCol);
    if (collidedTrack.code == TRACK_WALL_CODE) {
        car.trackBounce();
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
function isGoalReach() {
    // Get car's position
    let nextTrackRow = Math.floor(car.y / TRACK_HEIGHT);
    let nextTrackCol = Math.floor(car.x / TRACK_WIDTH);
    // Check if goal is reach
    let currentTrack = getTrackFromColAndRow(nextTrackRow, nextTrackCol);
    return currentTrack.code == TRACK_GOAL_CODE;
}

/**
 * Reset game
 */
function resetGame() {
    car.reset(carStartX, carStartY, graphics);
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
}
