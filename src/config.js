/**
 * Contains all game numbers and balancing
 */

// General game config
const FRAME_PER_SECOND = 30;
const ANGLE_MULTIPLICATOR = 5;

// Car
const CAR_START_X_OFFSET = 18;
const CAR_START_SPEED = 0;
const CAR_START_ANGLE = - Math.PI / 2;
const CAR_RADIUS = 10;
const CAR_ACCELERATION = 0.5;
const CAR_BRAKE = 0.3;
const CAR_ROTATION = 0.03 * Math.PI;
const GROUNDSPEED_DECAY_MULT = 0.94;
const CAR_MIN_TURN_SPEED = 0.5; // Minimum speed to turn
const CAR_MIN_SPEED = 0.1; // Minimum speed the car can go
const CAR_BOUNCE_TIMER = 15;
const CAR_GRAPHICS = 'images/car.png';
const CAR_P2_GRAPHICS = 'images/car-alt.png';

// Track elements
const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
const TRACK_STYLE = 'blue';


// Background
const BACKGROUND_STYLE = 'black';

// Text
const TEXT_STYLE = 'white';

// Key codes
const Z_CODE = 90;
const S_CODE = 83;
const Q_CODE = 81;
const D_CODE = 68;
const UP_CODE = 38;
const DOWN_CODE = 40;
const LEFT_CODE = 37;
const RIGHT_CODE = 39;

// Grid
const TRACK_ROAD_CODE = 0;
const TRACK_WALL_CODE = 1;
const TRACK_START_P1_CODE = 2;
const TRACK_START_P2_CODE = 10;
const TRACK_GOAL_CODE = 3;
const TRACK_FLAG_CODE = 4;
const TRACK_GRASS_CODE = 5;
const TRACK_ROAD_IMG = 'images/road.png';
const TRACK_WALL_IMG = 'images/block.png';
const TRACK_START_P1_IMG = 'images/road.png';
const TRACK_START_P2_IMG = 'images/road.png';
const TRACK_GOAL_IMG = 'images/flag.png';
const TRACK_FLAG_IMG = 'images/turn.png';
const TRACK_GRASS_IMG = 'images/grass.png';

const TRACKGRID =
    [5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
        5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 5, 5, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 4, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 2, 10, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 3, 0, 0, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 5];