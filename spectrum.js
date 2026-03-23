function Spectrum() {
    this.name = "spectrum";

    this.draw = function () {
        push();
        var spectrum = fourier.analyze();
        noStroke();

        for (var i = 0; i < spectrum.length; i++) {
            // map the frequency index to y (vertical position)
            var y = map(i, 0, spectrum.length, 0, height);
            // map the amplitude value to the width of the rectangle
            var w = map(spectrum[i], 0, 255, 0, width);

            // calculate color based on amplitude
            var amplitude = spectrum[i];
            var r = amplitude;
            var g = 255 - amplitude;
            var b = 0;

            // set the fill color for the current rectangle
            fill(r, g, b);

            // draw horizontal rectangles
            rect(0, y, w, height / spectrum.length);
        }
        pop();
    };
}
