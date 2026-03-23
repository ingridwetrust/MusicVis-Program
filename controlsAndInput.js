//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {
    this.menuDisplayed = false;
    this.hitSpace = false;

    //playback button displayed in the top left of the screen
    this.playbackButton = new PlaybackButton();
    this.backButton = new BackButton();
    this.replayButton = new ReplayButton();

    //mousep presses
    this.mousePressed = function () {
        if (
            !this.playbackButton.hitCheck() &&
            !this.backButton.hitCheck() &&
            !this.replayButton.hitCheck()
        ) {
        }
    };

    //responds to keyboard presses I MOVED THE FULLSCREEN HERE
    this.keyPressed = function (keycode) {
        if (keycode == 70) {
            if (fullscreen()) {
                fullscreen(false);
            } else {
                fullscreen(true);
            }
        }

        if (keycode == 32 && onLanding == false) {
            this.menuDisplayed = !this.menuDisplayed;
            this.hitSpace = true;
        }

        if (keycode > 48 && keycode < 58 && onLanding == false) {
            var visNumber = keycode - 49;
            vis.selectVisual(vis.visuals[visNumber].name);
        }
    };

    //draws the playback button and potentially the menu
    this.draw = function () {
        push();
        stroke(0);
        strokeWeight(2);
        textSize(28);

        // playback button
        this.playbackButton.draw();
        this.backButton.draw();
        this.replayButton.draw();

        // text guide to hit space
        if (!this.hitSpace) {
            push();
            textFont(ps2p);
            textSize(15);
            strokeWeight(0.5);
            textAlign(CENTER);
            text("Hit space to select between visualizers...", width / 2, 50);
            pop();
        }

        // only draw the menu if menu displayed is set to true
        if (this.menuDisplayed) {
            textFont(ps2p);
            textSize(20);
            strokeWeight(0.5);
            text("Select visualization", 20, (height / 4) * 3 - 60);
            this.menu();
        }
        pop();
    };

    this.menu = function () {
        //draw out menu items for each visualisation
        for (var i = 0; i < vis.visuals.length; i++) {
            textSize(18);
            text(
                i + 1 + "." + vis.visuals[i].name,
                20,
                (height / 4) * 3 - 30 + i * 30
            );
        }
    };
}
