function RorschachTest() {

    // vis name 
    this.name = "rorschach test";
    
    // variable to keep track
    this.time = 0;
    
    // main drawing function
    this.draw = function() {
        // get sound data
        var bass = fourier.getEnergy("bass") / 255;
        var mid = fourier.getEnergy("mid") / 255;
        
        // move time forward for animation
        this.time = this.time + 0.01 * (1 + bass);
        
        
        // move to center of screen
        push();
        translate(width/2, height/2);
        
        // no fill, just lines
        noFill();
        
        // Draw 7 layers of circles
        for (var layer = 0; layer < 7; layer++) {
            // How far out this layer is (0 to 1)
            var level = layer / 7;
            
            stroke(255, 77, 0);
            strokeWeight(1.5);
            
            // drawing the shape
            beginShape();
            
            // go around in a circle
            for (var angle = 0; angle < 360; angle = angle + 2) {
                // convert to radians
                var a = angle * PI / 180;
                
                // start looking for the edge at this angle
                var found = false;
                var maxSize = min(width, height) * 0.4;
                var x = 0;
                var y = 0;
                
                // different distances from center
                for (var r = 0; r < maxSize; r = r + 3) {
                    x = cos(a) * r;
                    y = sin(a) * r;
                    
                    // use perlin noise to make shapes
                    // noise() gives a value between 0 - 1
                    var noiseValue = noise(x * 0.01, y * 0.01, this.time);
                    
                    // make the noise value more centered
                    noiseValue = 0.4 + (noiseValue * 0.6);
                    
                    // add some curve based on sound
                    noiseValue = noiseValue + sin(r/50) * 0.8 * mid;
                    
                    // if at the right level, found the point
                    if (Math.abs(noiseValue - level) < 0.02) {
                        found = true;
                        break;
                    }
                }
                
                // if it didn't find a point, use maximum size
                if (!found) {
                    x = cos(a) * maxSize;
                    y = sin(a) * maxSize;
                }
                
                // add pont to the shape
                curveVertex(x, y);
            }
            
            // close the shape
            endShape(CLOSE);
        }
    
        pop();
    };
}