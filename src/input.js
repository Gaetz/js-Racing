/**
 * Manage player's input
 */
class Input {
    constructor() {
        this.isPressedUp = false;
        this.isPressedDown = false;
        this.isPressedLeft = false;
        this.isPressedRight = false;
        this.isP2PressedUp = false;
        this.isP2PressedDown = false;
        this.isP2PressedLeft = false;
        this.isP2PressedRight = false;
    }

    /**
     * Get up input in function of asking car
     * @param {Car} car 
     */
    isUpInput(car) {
        return this.chooseInput(car.isPlayer2, this.isPressedUp, this.isP2PressedUp);
    }


    /**
     * Get up input in function of asking car
     * @param {Car} car 
     */
    isDownInput(car) {
        return this.chooseInput(car.isPlayer2, this.isPressedDown, this.isP2PressedDown);
    }

    /**
     * Get left input in function of asking car
     * @param {Car} car 
     */
    isLeftInput(car) {
        return this.chooseInput(car.isPlayer2, this.isPressedLeft, this.isP2PressedLeft);
    }

    /**
     * Get right input in function of asking car
     * @param {Car} car 
     */
    isRightInput(car) {
        return this.chooseInput(car.isPlayer2, this.isPressedRight, this.isP2PressedRight);
    }

    /**
     * 
     * @param {bool} isPlayer2 
     * @param {bool} p1Input 
     * @param {bool} p2input 
     */
    chooseInput(isPlayer2, p1Input, p2Input) {
        if (isPlayer2)
            return p2Input;
        else
            return p1Input;
    }
}
