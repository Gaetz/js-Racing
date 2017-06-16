/**
 * Breakable Brick
 */
class Track {

    constructor(x, y, code, width = TRACK_WIDTH, height = TRACK_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.code = code;
    }

    update() {

    }

    draw(canvasContext) {
        if (this.code == TRACK_WALL_CODE) {
            canvasContext.fillStyle = TRACK_STYLE;
            canvasContext.beginPath();
            canvasContext.rect(this.x, this.y, this.width - TRACK_GAP, this.height - TRACK_GAP);
            canvasContext.fill();
        }
    }
}