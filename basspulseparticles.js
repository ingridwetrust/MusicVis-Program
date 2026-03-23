function BassPulseParticles() {
    this.name = "bass pulse particles";
    this.layers = 8;
    this.layerScales = [0.1, 0.2, 0.2, 0.3, 0.7, 1.2, 1.8, 2.5];
    this.particleColor = color(173, 216, 230);
    this.numParticles = 1500;
    this.ovalWidth = 400;
    this.ovalHeight = 170;
    this.layerDirections = [0, 0, 0, 1, -1, 1, -1, 1];
    this.layerSpeedFactors = [0.03, 0.04, 0.05, 0.06, 0.08, 0.06, 0.09, 0.07];
    this.smoothBass = 0;
    this.smoothMid = 0;

    this.layerParticles = [];
    for (var i = 0; i < this.layers; i++) {
        this.layerParticles[i] = [];
        for (var j = 0; j < this.numParticles; j++) {
            this.layerParticles[i][j] = {
                angle: random(TWO_PI),
                radiusFactor: 1,
                size: random(1, 3.5),
                phaseOffset: random(TWO_PI),
                speedOffset: random(0.6, 1.2),
            };
        }
    }

    this.draw = function () {
        push();
        background(0);
        translate(width / 2, height / 2);

        // get bass and mid frequencies, smooth their values
        var bass = fourier.getEnergy("bass");
        var mid = fourier.getEnergy("mid");
        this.smoothBass = lerp(this.smoothBass, bass, 0.1);
        this.smoothMid = lerp(this.smoothMid, mid, 0.1);

        // draw layers (from back to front)
        for (var layer = this.layers - 1; layer >= 0; layer--) {
            var direction = this.layerDirections[layer];
            var speedFactor = this.layerSpeedFactors[layer];

            push();
            rotate(frameCount * 0.005 * direction * speedFactor);
            noStroke();

            for (var i = 0; i < this.numParticles; i += 1) {
                var p = this.layerParticles[layer][i];

                // particle position with movement variations (not affected by audio)
                var currentAngle =
                    p.angle + frameCount * 0.001 * direction * p.speedOffset;
                var x =
                    cos(currentAngle) *
                    this.ovalWidth *
                    this.layerScales[layer];
                var y =
                    sin(currentAngle) *
                    this.ovalHeight *
                    this.layerScales[layer];
                x +=
                    sin(frameCount * 0.02 * p.speedOffset + p.phaseOffset) * 30;
                y +=
                    cos(frameCount * 0.02 * p.speedOffset + p.phaseOffset) * 25;

                // static alpha and size
                var alpha = 150 - layer * 8;
                var particleColorAlpha = color(173, 216, 230, alpha);
                var size = p.size;

                fill(particleColorAlpha);
                ellipse(x, y, size, size);
            }
            pop();
        }

        // draw center pulsating shape (reacting to bass)
        var wave = fourier.waveform();
        noStroke();
        fill(this.particleColor);
        var baseFillSize = 40 * map(this.smoothBass, 0, 255, 0.9, 1.1);
        ellipse(0, 0, baseFillSize, baseFillSize);

        // draw outer waveform ring (reacting to music)
        noFill();
        stroke(this.particleColor);
        strokeWeight(10 * map(this.smoothBass, 0, 255, 0.8, 1.2));
        var movementIntensity = map(this.smoothMid, 0, 255, 5, 15);
        var baseRadius = 15;

        beginShape();
        for (var i = 0; i < wave.length; i += 16) {
            var theta = map(i, 0, wave.length, 0, TWO_PI);
            var r = baseRadius + sin(wave[i] * TWO_PI) * movementIntensity;
            vertex(r * cos(theta), r * sin(theta));
        }
        endShape(CLOSE);

        pop();
    };
}
