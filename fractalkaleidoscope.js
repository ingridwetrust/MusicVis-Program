function FractalKaleidoscope() {
    // vis name
    this.name = "kaleidoscope";

    // core parameters
    this.numSegments = 7;
    this.fractalDepth = 4;
    this.radiusScale = 0.7;
    this.rotationSpeed = 0.004;
    this.rotation = 3;
    this.colorOffset = 0;
    this.baseRadius = min(width, height) * 0.35;

    // smooth transition variables for colors
    this.smoothingFactor = 0.008;
    this.currentColors = [];
    this.targetColors = [];

    // beat detection variables (updated to match the example)
    this.peakDetect = new p5.PeakDetect();
    //how quicky changes the colors
    this.peakDetect.threshold = 0.001;

    // Initialize arrays
    var numBands = 4;
    for (var i = 0; i < numBands; i++) {
        // Initialize color arrays for smooth transitions
        this.currentColors[i] = [255, 0, 128];
        this.targetColors[i] = [255, 0, 128];
    }

    // color palette
    this.colors = [
        [255, 0, 128], //magenta
        [0, 255, 255], //cyan
        [255, 255, 0], //yellow
        [255, 0, 255], //purple
        [0, 255, 128], //spring green
        [255, 128, 0], //orange
    ];

    // helper function to lerp between colors
    this.lerpColor = function (c1, c2, amt) {
        return [
            lerp(c1[0], c2[0], amt),
            lerp(c1[1], c2[1], amt),
            lerp(c1[2], c2[2], amt),
        ];
    };

    this.draw = function () {
        push();

        // center the kaleidoscope
        translate(width / 2, height / 2);

        // maintain slow spin
        this.rotation += this.rotationSpeed;
        rotate(this.rotation);

        fourier.analyze();

        var bassEnergy = fourier.getEnergy("bass") / 255;
        var midEnergy = fourier.getEnergy("mid") / 255;
        var trebleEnergy = fourier.getEnergy("treble") / 255;

        // update peak detection
        this.peakDetect.update(fourier);

        // check for beats using the peak detector
        if (this.peakDetect.isDetected) {
            // change target colors on beat
            for (var i = 0; i < this.currentColors.length; i++) {
                var colorIdx = (i + this.colorOffset) % this.colors.length;
                this.targetColors[i] = this.colors[colorIdx].slice();
            }

            // increment color offset for next beat
            this.colorOffset = (this.colorOffset + 1) % this.colors.length;
        }

        // smooth color transitions
        for (var i = 0; i < this.currentColors.length; i++) {
            this.currentColors[i] = this.lerpColor(
                this.currentColors[i],
                this.targetColors[i],
                this.smoothingFactor
            );
        }

        // draw the kaleidoscope segments
        for (var i = 0; i < this.numSegments; i++) {
            var angle = (TWO_PI / this.numSegments) * i;
            push();
            rotate(angle);

            this.drawFractal(
                0,
                0,
                this.baseRadius,
                this.fractalDepth,
                bassEnergy,
                midEnergy,
                trebleEnergy,
                (i + this.colorOffset) % this.colors.length
            );

            pop();
        }

        pop();
    };

    // simplified fractal drawing
    this.drawFractal = function (
        x,
        y,
        radius,
        depth,
        bassEnergy,
        midEnergy,
        trebleEnergy,
        colorIndex
    ) {
        if (depth <= 0) return;

        // use depth-based color band
        var depthColorIndex = min(this.currentColors.length - 1, depth - 1);

        // get depth-based colors
        var r = this.currentColors[depthColorIndex][0];
        var g = this.currentColors[depthColorIndex][1];
        var b = this.currentColors[depthColorIndex][2];

        // color influence from audio
        r = constrain(r * (1 + bassEnergy * 0.3), 0, 255);
        g = constrain(g * (1 + midEnergy * 0.3), 0, 255);
        b = constrain(b * (1 + trebleEnergy * 0.3), 0, 255);

        // draw the current element
        push();
        translate(x, y);

        // glow effect (different intensity)
        for (var i = 3; i > 0; i--) {
            fill(r, g, b, 50 / i);
            stroke(r, g, b, 150 / i);
            strokeWeight(1 / i);

            // draw a circle
            ellipse(0, 0, radius * 2);
        }

        // new parameters for recursive elements
        var angleDelta = TWO_PI / 3;
        var newRadius = radius * this.radiusScale;
        var distance = radius * 1.2;

        for (var i = 0; i < 3; i++) {
            var childAngle = angleDelta * i;
            var childX = distance * cos(childAngle);
            var childY = distance * sin(childAngle);

            this.drawFractal(
                childX,
                childY,
                newRadius,
                depth - 1,
                bassEnergy,
                midEnergy,
                trebleEnergy,
                (colorIndex + i + 1) % this.colors.length
            );
        }

        pop();
    };
}
