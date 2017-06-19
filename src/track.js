/**
 * Breakable Brick
 */
class Track {

    constructor(x, y, code, graphics, width = TRACK_WIDTH, height = TRACK_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.code = code;
        this.pic = this.loadPic(code, graphics);
    }

    loadPic(code, graphics) {
        switch (code) {
            case TRACK_ROAD_CODE:
                return graphics.get('road');
            case TRACK_WALL_CODE:
                return graphics.get('wall');
            case TRACK_START_CODE:
                return graphics.get('road');
            case TRACK_GOAL_CODE:
                return graphics.get('goal');
        }
    }

    draw() {
        Graphics.drawBitmap(this.pic, this.x, this.y);
    }
}