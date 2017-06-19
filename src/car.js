/**
 * The ball the players have to catch
 */
class Car {

    constructor(x, y, isPlayer2, graphics, radius = CAR_RADIUS, speed = CAR_START_SPEED, angle = CAR_START_ANGLE) {
        this.x = x;
        this.y = y;
        this.isPlayer2 = isPlayer2;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        // Load car image
        if (isPlayer2) {
            this.carPic = graphics.get('carP2');
        } else {
            this.carPic = graphics.get('car');
        }
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
        // Input controls
        if (this.outOfControlTimer > 0) {
            this.outOfControlTimer = this.outOfControlTimer - 1;
        } else {
            if (this.isPlayer2) {
                if (input.isP2PressedUp) {
                    this.speed = this.speed + CAR_ACCELERATION;
                }
                if (input.isP2PressedDown) {
                    this.speed = this.speed - CAR_BRAKE;
                }
                if (input.isP2PressedLeft && Math.abs(this.speed) > CAR_MIN_TURN_SPEED) {
                    this.angle = this.angle - CAR_ROTATION;
                }
                if (input.isP2PressedRight && Math.abs(this.speed) > CAR_MIN_TURN_SPEED) {
                    this.angle = this.angle + CAR_ROTATION;
                }
            } else {
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
            }
        }
        // Move
        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y + Math.sin(this.angle) * this.speed;
        // Automatic deceleration
        if (Math.abs(this.speed) > CAR_MIN_SPEED)
            this.speed = this.speed * GROUNDSPEED_DECAY_MULT;
        else
            this.speed = 0;
        // Wall bounce
        if (this.y <= 0 || this.y >= canvas.height)
            this.speed *= -1;
        if (this.x >= canvas.width || this.x <= 0)
            this.speed *= -1;
    }

    draw() {
        Graphics.drawBitmapWithRotation(this.carPic, this.x, this.y, this.angle);
    }

    /**
     * Called when the bounces on a wall
     */
    trackBounce() {
        this.outOfControlTimer = CAR_BOUNCE_TIMER;
        this.speed = this.speed * -0.5;
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