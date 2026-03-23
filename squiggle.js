function Squiggle() {
    this.name = "squiggly worm";

    var rot = 0;
    var noiseStep = 0.01;
    var prog = 0;
    var rotateThresh = 67;
    var progThresh = 180;
    var seedThresh = 180;

    this.draw = function () {
        background(0);
        fill(255);
        noStroke();

        // analyze audio frequencies
        fourier.analyze();

        // get bass and treble energy values
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");

        // draw rotating blocks using treble energy
        this.rotatingBlocks(t);
        // draw noise line using bass and treble
        this.noiseLine(b, t);
    };

    this.rotatingBlocks = function (energy) {
        // rotate blocks when treble is low
        if (energy < rotateThresh) {
            rot += 0.01;
        }

        // map energy to rectangle size
        var r = map(energy, 0, 255, 20, 100);

        push();
        rectMode(CENTER);
        translate(width / 2, height / 2);
        rotate(rot);
        fill(255, 0, 0);

        var incr = width / (10 - 1);

        // draw 10 rectangles in a row
        for (var i = 0; i < 10; i++) {
            rect(i * incr - width / 2, 0, r, r);
        }

        pop();
    };

    this.noiseLine = function (energy, energy2) {
        push();
        translate(width / 2, height / 2);
        beginShape();
        noFill();
        stroke(255);
        strokeWeight(3);

        // create noise-based line with 100 points
        for (var i = 0; i < 100; i++) {
            var x = map(noise(i * noiseStep + prog), 0, 1, -250, 250);
            var y = map(noise(i * noiseStep + prog + 1000), 0, 1, -250, 250);

            vertex(x, y);
        }

        endShape();

        // progress noise when bass is high
        if (energy > progThresh) {
            prog += 0.05;
        }

        // change noise seed when treble is high
        if (energy2 > seedThresh) {
            noiseSeed();
        }

        pop();
    };
}
