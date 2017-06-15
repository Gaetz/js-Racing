let canvas, canvasContext;
let car, tracks, background, trackGrid;

/**
 * Game start
 */
window.onload = function () {
    // Load game elements
    load();
    // Manage inputs
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
    });
    // Loop
    setInterval(() => {
        update();
        draw();
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Get mouse position on screen
 * @param {event} evt - Passing mouse move
 */
function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

/**
 * Loading game elements 
 * */
function load() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
    background = new Background(canvas.width, canvas.height);
    // Data
    car = new Car(CAR_START_X, CAR_START_Y);
    // Track
    tracks = [];
    loadTracks();
}

/**
 * Load all tracks
 */
function loadTracks() {
    trackGrid = 
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < TRACK_ROWS; i++) {
        for (let j = 0; j < TRACK_COLS; j++) {
            let newTrack = new Track(j * TRACK_WIDTH, i * TRACK_HEIGHT, trackGrid[i * TRACK_COLS + j] == 1);
            tracks.push(newTrack);
        }
    }
}

/**
 * Update loop
 */
function update() {
    car.update(canvas);
    // Car bouncing on track
    updateCarCollision();
}

/**
 * Handle car colliding with tracks
 */
function updateCarCollision() {
    let trackRow = Math.floor(car.y / TRACK_HEIGHT);
    let trackCol = Math.floor(car.x / TRACK_WIDTH);
    // Track col and row must be in config limit
    if (trackCol < 0 || trackRow < 0 || trackRow >= TRACK_ROWS || trackCol >= TRACK_COLS)
        return;
    // Collision
    let collidedTrack = getTrackFromColAndRow(trackRow, trackCol);
    if (collidedTrack.isAlive) {
        //collidedTrack.isAlive = false;
        car.trackBounce(trackRow, trackCol);
    }
}

/**
 * Get track index from row and col
 * @param {int} trackRow 
 * @param {int} trackCol 
 */
function getTrackFromColAndRow(trackRow, trackCol) {
    return tracks[trackCol + trackRow * TRACK_COLS];
}

/**
 * Reset game
 */
function resetGame() {
    car.reset();
    tracks = [];
    loadTracks();
    trackCounter = TRACK_ROWS * TRACK_COLS;
}


/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].draw(canvasContext);
    }
    car.draw(canvasContext);
}
