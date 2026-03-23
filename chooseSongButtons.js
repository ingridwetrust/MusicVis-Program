// song Choosing buttons for the landing page
function ChooseSongButtons() {
    this.x = windowWidth / 2 - 210;
    this.y = windowHeight / 2 - 250;
    this.rowPadding = 30;
    this.columnPadding = 20;
    this.width = 200;
    this.height = 50;
    this.hoverIndex = -1; // tracks which button is hovered
    this.prevHoverIndex = -1; // tracks the previously hovered button
    this.isHovering = false; // tracks if we're hovering over any button
    this.songName = [
        "Marvin Gaye - \n Inner city blues",
        "Salt 'n' Pepa -\n Shoop",
        "Gil Scott-Heron - \n Gun",
        "Childish Gambino - \n Redbone",
        "Erykah Badu - \n On & On",
        "Stan Getz - \n Só Danco Samba",
    ];

    this.draw = function () {
        this.x = windowWidth / 2 - 210;
        this.y = windowHeight / 2 - 250;

        // store the previous hover state before resetting
        var wasHovering = this.isHovering;
        this.isHovering = false;
        var oldHoverIndex = this.hoverIndex;
        this.hoverIndex = -1; // reset hover index at the start of each frame

        for (var c = 0; c < 2; c++) {
            for (var r = 0; r < 3; r++) {
                var btnX = this.x + c * (this.width + this.columnPadding);
                var btnY = this.y + r * (this.height + this.rowPadding);
                var songNumber = 1 + c * 3 + r;

                // check if the mouse is currently over this button
                if (
                    mouseX > btnX &&
                    mouseX < btnX + this.width &&
                    mouseY > btnY &&
                    mouseY < btnY + this.height
                ) {
                    this.hoverIndex = songNumber; // Set hover index to the current song number
                    this.isHovering = true;

                    // play sound when hovering once
                    if (!wasHovering || oldHoverIndex != this.hoverIndex) {
                        hoverSound.play();
                    }
                }

                noFill();
                stroke("white");
                strokeWeight(1);
                rect(btnX, btnY, this.width, this.height);
                fill("black");
                stroke("black");
                strokeWeight(1);
                textSize(14);
                textAlign(CENTER);

                //only levitate the hovered text
                var textY =
                    this.hoverIndex == songNumber
                        ? btnY + this.height / 1.7
                        : btnY + this.height / 2 + 10;
                text(
                    songNumber + ". " + this.songName[songNumber - 1],
                    btnX + this.width / 2,
                    textY - 11
                );
            }
        }
    };

    // checks for clicks on the button, starts or pauses playback
    // (returns true if clicked, false otherwise)
    this.hitCheck = function () {
        for (var c = 0; c < 2; c++) {
            for (var r = 0; r < 3; r++) {
                var btnX = this.x + c * (this.width + this.columnPadding);
                var btnY = this.y + r * (this.height + this.rowPadding);
                var songNumber = 1 + c * 3 + r;

                if (
                    mouseX > btnX &&
                    mouseX < btnX + this.width &&
                    mouseY > btnY &&
                    mouseY < btnY + this.height
                ) {
                    clickSound.play();
                    console.log(songNumber - 1); //log the index of the clicked song
                    onLanding = false;

                    // assigning songs
                    if (songNumber == 1) {
                        vis.selectVisual("circular");
                        sound = marvin;
                        sound.loop();
                    }
                    if (songNumber == 2) {
                        vis.selectVisual("wavepattern");
                        sound = saltnpepa;
                        sound.loop();
                    }
                    if (songNumber == 3) {
                        vis.selectVisual("webcam");
                        sound = gil;
                        sound.loop();
                    }
                    if (songNumber == 4) {
                        vis.selectVisual("bass pulse particles");
                        sound = gambino;
                        sound.loop();
                    }
                    if (songNumber == 5) {
                        vis.selectVisual("kaleidoscope");
                        sound = badu;
                        sound.loop();
                    }

                    if (songNumber == 6) {
                        vis.selectVisual("rorschach test");
                        sound = stan;
                        sound.loop();
                    }

                    return true;
                }
            }
        }
        return false;
    };
}
