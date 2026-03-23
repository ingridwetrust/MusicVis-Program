//draw the waveform to the screen
function Circular() {
    this.name = "circular";
    this.number = 80;
    this.diff = 200;
    this.space = 6;

    //draw the wave form to the screen
    this.draw = function () {
        push();
        noFill();
        stroke(255, 0, 0);
        strokeWeight(2);

        // center the visualization
        translate(width / 2, height / 2);

        // get the waveform data
        var wave = fourier.waveform();

        for (var i = 0; i < this.number; i++) {
            this.drawCircular(i * this.space, i * this.space + this.diff, wave);
        }

        pop();
    };

    this.drawCircular = function (a, b, wave) {
        beginShape();

        // draw right half of the circle
        for (var i = 0; i <= 180; i++) {
            // map angle to waveform index
            var index = floor(map(i, 0, 180, 0, wave.length - 1));

            // map waveform value to radius
            var r = map(wave[index], -1, 1, a, b);

            var x = r * sin(i);
            var y = r * cos(i);

            vertex(x, y);
        }

        endShape();
        beginShape();

        // draw left half of the circle
        for (var i = 0; i <= 180; i++) {
            // map angle to waveform index
            var index = floor(map(i, 0, 180, 0, wave.length - 1));

            // map waveform value to radius
            var r = map(wave[index], -1, 1, a, b);

            // negative sin for left half
            var x = r * -sin(i);
            var y = r * cos(i);

            vertex(x, y);
        }

        endShape();
    };
}
