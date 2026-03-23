// restarts currently playing song
function ReplayButton(){
	
	this.x = 25;
	this.y = 180;
	this.width = 45;
	this.height = 50;

	this.draw = function(){
		fill(255,40,3);
            ellipse(this.x * 2, this.y + 25, 60);
        fill(0);
            ellipse(this.x * 2, this.y + 25, 20);
        fill(255,40,3);
			triangle(this.x, this.y  + 3, this.x * 2, this.y + 22, this.x * 2, this.y - 13);
        stroke(255,40,3);
        beginShape();
        vertex(this.x * 2, this.y - 3.5);
        vertex(this.x * 2, this.y + 13);
        endShape();

	};

	// checks for clicks on the button, starts to play or restarts track
	// returns true if clicked false otherwise
	this.hitCheck = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			clickSound.play();
			
			// restart the music from the beginning and make sure it's playing
			sound.jump(0);
			
			// make sure the music is playing (in case it was paused)
			if (!sound.isPlaying()) {
				sound.play();
			}
			
			return true;
		}
		return false;
	};

}