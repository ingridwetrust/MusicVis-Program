// displays and handles clicks on the playback button
function BackButton() {
    this.x = 20;
    this.y = 20;
    this.width = 50;
    this.height = 50;

    this.draw = function () {
        fill(255, 120, 3);
        triangle(
            this.x,
            this.y + this.height / 2,
            this.x + this.width,
            this.y + this.height,
            this.x + this.width,
            this.y
        );
    };

    // checks for clicks on the button, starts or pauses playback
    // returns true if clicked false otherwise
    this.hitCheck = function () {
        if (
            mouseX > this.x &&
            mouseX < this.x + this.width &&
            mouseY > this.y &&
            mouseY < this.y + this.height
        ) {
            onLanding = true;
            clickSound.play();
            sound.jump(0);
            sound.pause();

            return true;
        }
        return false;
    };
}
