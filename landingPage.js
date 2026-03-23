var landingImg;
var showText = true;

function LandingPage() {
    this.landingDone = false;
    this.csb = new ChooseSongButtons();

    this.draw = function () {
        push();
        // mixtape title
        imageMode(CENTER);
        image(
            landingImg,
            width / 2,
            height / 2,
            landingImg.width / 2,
            landingImg.height / 2
        );
        textAlign(CENTER);
        fill(0);
        noStroke();
        strokeWeight(3);
        textSize(28);
        textFont(rockSaltFont);
        text('"Ingrid\'s mixtape"', width / 2, height / 2 + 70);
        // songs titles
        this.csb.draw();
        // toggle text visibility
        if (frameCount % 50 === 0) {
            showText = !showText;
        }
        // display the text if showText is true
        if (showText) {
            // choose a track
            textAlign(CENTER);
            fill(255, 77, 3);
            noStroke();
            strokeWeight(3);
            textSize(28);
            textFont(ps2p);
            text("Select a song...", width / 2, height / 10);
        }
        pop();
    };

    this.mousePressed = function () {
        if (!this.csb.hitCheck()) {
            console.log("DIDNT HIT BUTTON");
        }
    };
}
