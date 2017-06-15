/**
 * The ball the players have to catch
 */
class Car {

    constructor(x, y = Math.round(Math.random() * 450 + 75), radius = CAR_RADIUS, speed = CAR_START_SPEED, angle = - Math.PI / 2) {
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
    }

    update(canvas, input) {
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
        this.speed = this.speed * GROUNDSPEED_DECAY_MULT;
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
     * Called when a ball bounces on the paddle
     * @param {*} paddle - Paddle on which the ball bounces
     */
    bounce(paddle, canvas) {
        this.speed = paddle.getBounceHorizontalSpeed(this.x);
        this.speed *= -1;
        // Place ball in case it got out of screen because of speed
        if (this.y > canvas.height)
            this.y = paddle.y;
    }

    /**
     * Called when a ball bounces on a brick
     */
    trackBounce(row, col) {
        let previousRow = Math.floor((this.y - this.speed) / TRACK_HEIGHT);
        let previousCol = Math.floor((this.x - this.speed) / TRACK_WIDTH);
        // Lateral collision
        if (previousCol != col)
            this.speed *= -1;
        // Horizontal collision
        if (previousRow != row)
            this.speed *= -1;

    }

    /**
     * Reset ball position and speed
     */
    reset() {
        this.x = CAR_START_X;
        this.y = CAR_START_Y;
        this.speed = CAR_START_SPEED;
    }
}