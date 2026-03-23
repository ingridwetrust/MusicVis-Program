function WavePattern() {
    // vis name
    this.name = "wavepattern";

    // draw the waveform to the screen
    this.draw = function () {
        push();
        noFill();

        // loop to draw 30 layers
        for (var layer = 0; layer < 30; layer++) {
            //each layer color between shades of orange
            var layerColor = lerpColor(
                color(255, 20, 0),
                color(255, 120, 0),
                layer / 20
            );
            stroke(layerColor);
            strokeWeight(0.3);

            beginShape();
            // calculate the waveform from the fft
            var wave = fourier.waveform();
            for (var i = 0; i < wave.length; i++) {
                // for each element of the waveform, map it to screen coordinates and make a new vertex at the point
                var x = map(i, 0, wave.length, 0, width);
                // y position of each layer
                var y = map(wave[i], -1, 1, 0, height - 200) + layer * 8; // adjust for shift

                vertex(x, y);
            }
            endShape();
        }

        pop();
    };
}
