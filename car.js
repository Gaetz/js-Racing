/**
 * The ball the players have to catch
 */
class Car {

    constructor(x, y, radius = CAR_RADIUS, speed = CAR_START_SPEED, angle = CAR_START_ANGLE) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        // Load car image
        this.isCarPicLoaded = false;
        this.carPic = document.createElement('img');
        this.carPic.src = CAR_GRAPHICS;
        this.carPic.onload = () => {
            this.isCarPicLoaded = true;
        };
        // Car out of control variable
    }

    /**
     * Return car's next horizontal position
     */
    getNextX() {
        return this.x + Math.cos(this.angle) * this.speed;
    }

    /**
     * Return car's next vertival position
     */
    getNextY() {
        return this.y + Math.sin(this.angle) * this.speed;
    }

    update(canvas, input) {
        document.getElementById('debugText').innerHTML = "Speed: " + this.speed;
        // Input controls
        if (input.isPressedUp) {
            this.speed = this.speed + CAR_ACCELERATION;
        }
        if (input.isPressedDown) {
            this.speed = this.speed - CAR_BRAKE;
        }
        if (input.isPressedLeft && Math.abs(this.speed) > CAR_MIN_TURN_SPEED) {
            this.angle = this.angle - CAR_ROTATION;
        }
        if (input.isPressedRight && Math.abs(this.speed) > CAR_MIN_TURN_SPEED) {
            this.angle = this.angle + CAR_ROTATION;
        }
        // Move
        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y + Math.sin(this.angle) * this.speed;
        // Automatic deceleration
        if (this.speed > CAR_MIN_SPEED)
            this.speed = this.speed * GROUNDSPEED_DECAY_MULT;
        else
            this.speed = 0;
        // Wall bounce
        if (this.y <= 0 || this.y >= canvas.height)
            this.speed *= -1;
        if (this.x >= canvas.width || this.x <= 0)
            this.speed *= -1;
    }

    draw(canvasContext) {
        if (this.isCarPicLoaded) {
            this.drawBitmap(this.carPic, this.x, this.y, this.angle);
        }
    }

    drawBitmap(graphics, x, y, angle) {
        canvasContext.save();
        canvasContext.translate(x, y);
        canvasContext.rotate(angle);
        canvasContext.drawImage(graphics, - graphics.width / 2, - graphics.height / 2);
        canvasContext.restore();
    }

    /**
     * Called when the bounces on a wall
     */
    trackBounce() {
        this.speed *= -0.5;
    }

    /**
     * Reset ball position and speed
     */
    reset(carStartX, carStartY) {
        this.x = carStartX;
        this.y = carStartY;
        this.speed = CAR_START_SPEED;
        this.angle = CAR_START_ANGLE;
    }
}