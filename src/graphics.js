/**
 * Manage images
 */
class Graphics {

    constructor() {
        this.picCounter = 0;
        this.resources = new Map();
        let loader = [
            { name: 'car', src: CAR_GRAPHICS },
            { name: 'road', src: TRACK_ROAD_IMG },
            { name: 'wall', src: TRACK_WALL_IMG },
            { name: 'goal', src: TRACK_GOAL_IMG },
            { name: 'flag', src: TRACK_FLAG_IMG },
            { name: 'grass', src: TRACK_GRASS_IMG }
        ];
        for (let i = 0; i < loader.length; i++) {
            this.picCounter = this.picCounter + 1;
            this.beginLoadPic(loader[i].name, loader[i].src);
        }
    }

    beginLoadPic(name, src) {
        let pic = document.createElement('img');
        pic.src = src;
        pic.onload = () => {
            this.resources.set(name, pic);
        };
    }

    get(name) {
        return this.resources.get(name);
    }

    isLoadingDone() {
        return this.resources.size == this.picCounter;
    }

    static drawBitmap(graphics, x, y) {
        canvasContext.save();
        canvasContext.translate(x, y);
        canvasContext.drawImage(graphics, 0, 0);
        canvasContext.restore();
    }

    static drawBitmapWithRotation(graphics, x, y, angle) {
        canvasContext.save();
        canvasContext.translate(x, y);
        canvasContext.rotate(angle);
        canvasContext.drawImage(graphics, - graphics.width / 2, - graphics.height / 2);
        canvasContext.restore();
    }
}

