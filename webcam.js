function WebcamMusicVisualizer() {
    //vis name
    this.name = "webcam";

    this.video = null;
    this.isSetup = false;
    this.invertColors = false;

    // audio properties
    this.bassValue = 0;
    this.bassCutoff = 0;
    this.midlowValue = 0;
    this.midlowCutoff = 0;

    this.setup = function () {
        // create webcam capture using p5.js function
        this.video = createCapture(VIDEO);
        this.video.size(640, 480);
        this.video.hide();
        this.isSetup = true;
    };

    this.detectBass = function (spectrum) {
        var sum = 0;
        for (var i = 0; i < 20; i++) {
            sum += spectrum[i];
        }
        var normalized = sum / 20 / 255;

        if (normalized > this.bassCutoff && normalized > 0.45) {
            this.bassValue = normalized;
            this.bassCutoff = normalized * 1.1;
            return true;
        } else {
            this.bassValue *= 0.98;
            this.bassCutoff *= 0.98;
            this.bassCutoff = Math.max(this.bassCutoff, 0.45);
            return false;
        }
    };

    this.detectMidlow = function (spectrum) {
        var sum = 0;
        for (var i = 20; i < 40; i++) {
            sum += spectrum[i];
        }
        var normalized = sum / 20 / 255;

        if (normalized > this.midlowCutoff && normalized > 0.4) {
            this.midlowValue = normalized;
            this.midlowCutoff = normalized * 1.1;
            return true;
        } else {
            this.midlowValue *= 0.98;
            this.midlowCutoff *= 0.98;
            this.midlowCutoff = Math.max(this.midlowCutoff, 0.4);
            return false;
        }
    };

    this.draw = function () {
        // check if webcam is ready
        if (!this.isSetup || !this.video || !this.video.loadedmetadata) {
            textAlign(CENTER, CENTER);
            textSize(20);
            fill(255, 77, 3);
            textFont(ps2p);
            text("Waiting for webcam access...", width / 2, height / 2);
            textAlign(LEFT, BASELINE);
            return;
        }

        // get audio data
        var spectrum = fourier.analyze();
        var bassHit = this.detectBass(spectrum);

        // color change on strong bass
        if (bassHit && this.bassValue > 0.75) {
            this.invertColors = !this.invertColors;
        }

        // calculate distortion based on midlow
        this.detectMidlow(spectrum);
        var distortAmount = map(this.midlowValue, 0, 1, 0, 30);

        //load webcam pixels
        this.video.loadPixels();

        // create output image
        var img = createImage(this.video.width, this.video.height);
        img.loadPixels();

        // set colors
        if (this.invertColors) {
            fgColor = [0, 0, 0];
            bgColor = [255, 102, 0];
        } else {
            fgColor = [255, 102, 0];
            bgColor = [0, 0, 0];
        }

        var threshold = 127 + this.bassValue * 50;

        // to process each pixel
        for (var y = 0; y < this.video.height; y++) {
            for (var x = 0; x < this.video.width; x++) {
                // apply wave distortion
                var distX = x;
                var distY = y;

                distX = x + sin(y * 0.02 + frameCount * 0.06) * distortAmount;
                distY = y + cos(x * 0.02 + frameCount * 0.06) * distortAmount;

                //stops lagging
                distX = constrain(distX, 0, this.video.width - 1);
                distY = constrain(distY, 0, this.video.height - 1);

                // convert to integers
                var sourceX = Math.floor(distX);
                var sourceY = Math.floor(distY);

                // set colors from distorted position
                var sourceIndex = (sourceY * this.video.width + sourceX) * 4;
                var r = this.video.pixels[sourceIndex];
                var g = this.video.pixels[sourceIndex + 1];
                var b = this.video.pixels[sourceIndex + 2];

                // simple brightness calculation
                var brightness = (r + g + b) / 3;

                // set output pixel
                var outputIndex = (y * this.video.width + x) * 4;

                if (brightness > threshold) {
                    img.pixels[outputIndex] = fgColor[0];
                    img.pixels[outputIndex + 1] = fgColor[1];
                    img.pixels[outputIndex + 2] = fgColor[2];
                } else {
                    img.pixels[outputIndex] = bgColor[0];
                    img.pixels[outputIndex + 1] = bgColor[1];
                    img.pixels[outputIndex + 2] = bgColor[2];
                }
                img.pixels[outputIndex + 3] = 255;
            }
        }

        img.updatePixels();
        image(img, 0, 0, width, height);

        textAlign(LEFT, BASELINE);
    };
}
