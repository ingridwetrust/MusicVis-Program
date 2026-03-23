// constructor function to draw a
function Needles() {
    // name of the visualisation
    this.name = "needles";

    // how large is the arc of the needle plot.
    var minAngle = PI + PI / 10;
    var maxAngle = TWO_PI - PI / 10;

    this.plotsAcross = 2;
    this.plotsDown = 2;

    // frquencies used by the energyfunction to retrieve a value
    // for each plot
    this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

    // resize the plots sizes when the screen is resized.
    this.onResize = function () {
        this.pad = width / 20;
        this.plotWidth = (width - this.pad) / this.plotsAcross;
        this.plotHeight = (height - this.pad) / this.plotsDown;
        this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
    };
    // call onResize to set initial values when the object is created
    this.onResize();

    // draw the plots to the screen
    this.draw = function () {
        // create an array amplitude values from the fft.
        fourier.analyze();
        // iterator for selecting frequency bin.
        var currentBin = 0;
        push();
        fill(240, 242, 210);
        // nested for loop to place plots in 2*2 grid.
        for (var i = 0; i < this.plotsDown; i++) {
            for (var j = 0; j < this.plotsAcross; j++) {
                // calculate the position for the current plot
                var x = this.pad + j * this.plotWidth; // horizontal position
                var y = this.pad + i * this.plotHeight; // vertical position
                var w = this.plotWidth - this.pad; // adjusted width
                var h = this.plotHeight - this.pad; // adjusted height

                // draw a rectangle at the calculated position and size
                rect(x, y, w, h);

                var energy = fourier.getEnergy(this.frequencyBins[currentBin]);
                //add the ticks
                this.ticks(x + w / 2, y + h, this.frequencyBins[currentBin]);
                //add the needle
                this.needle(energy, x + w / 2, y + h);
                currentBin++;
            }
        }

        pop();
    };

    //draws a needle to an individual plot
    this.needle = function (energy, centreX, bottomY) {
        push();
        stroke(51, 51, 51);
        //translate so 0 is at the bottom of the needle
        translate(centreX, bottomY);
        //map the energy to the angle for the plot
        theta = map(energy, 0, 255, minAngle, maxAngle);
        //calculate x and y coorindates from angle for the length of needle
        var x = this.dialRadius * cos(theta);
        var y = this.dialRadius * sin(theta);
        //draw the needle
        line(0, 0, x, y);
        pop();
    };

    //draw the graph ticks on an indivisual plot
    this.ticks = function (centreX, bottomY, freqLabel) {
        // 8 ticks from pi to 2pi
        var nextTickAngle = minAngle;
        push();
        stroke(51, 51, 51);
        fill(255, 77, 10);
        translate(centreX, bottomY);
        //draw the semi circle for the botttom of the needle
        arc(0, 0, 20, 20, PI, 2 * PI);
        textAlign(CENTER);
        textSize(12);
        text(freqLabel, 0, -(this.plotHeight / 2));

        for (var i = 0; i < 9; i++) {
            //for each tick work out the start and end coordinates of
            //based on its angle from the needle's origin.
            var x = this.dialRadius * cos(nextTickAngle);
            var x1 = (this.dialRadius - 5) * cos(nextTickAngle);

            var y = this.dialRadius * sin(nextTickAngle);
            var y1 = (this.dialRadius - 5) * sin(nextTickAngle);

            line(x, y, x1, y1);
            nextTickAngle += PI / 10;
        }
        pop();
    };
}
