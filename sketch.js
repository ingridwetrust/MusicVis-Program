//variable to check if you are on the landing page or not
var onLanding = true;
//global for the landing page
var landing = null;
//global for the controls and input
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;

//variable for the fonts
var rockSaltFont;
var ps2p;

//variable for the songs
var marvin = null;
var saltnpepa = null;
var gil = null;
var gambino = null;
var badu = null;
var stan = null;

//variable for the mouse interaction sounds
var clickSound;
var hoverSound;

//variable for p5 fast fourier transform
var fourier;

function preload() {
    rockSaltFont = loadFont("assets/RockSalt-Regular.ttf");
    ps2p = loadFont("assets/ps2p.ttf");
    landingImg = loadImage("assets/cassettelandingpage.jpg");
    clickSound = loadSound("assets/click.mp3");
    hoverSound = loadSound("assets/hover.mp3");
    marvin = loadSound("assets/marvin.mp3");
    saltnpepa = loadSound("assets/saltnpepa.mp3");
    gil = loadSound("assets/gil.mp3");
    gambino = loadSound("assets/gambino.mp3");
    badu = loadSound("assets/badu.mp3");
    stan = loadSound("assets/stan.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    landing = new LandingPage();
    controls = new ControlsAndInput();

    //instantiate the fft object
    fourier = new p5.FFT();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Circular());
    vis.add(new WavePattern());
    vis.add(new WebcamMusicVisualizer());

    vis.add(new BassPulseParticles());
    vis.add(new FractalKaleidoscope());
    vis.add(new RorschachTest());

    vis.add(new Spectrum());
    vis.add(new Squiggle());
    vis.add(new Needles());
}

function draw() {
    background(0);
    //draw the selected visualisation

    if (onLanding == true) {
        landing.draw();
    } else {
        vis.selectedVisual.draw();
        //draw the controls on top.
        controls.draw();
    }
}

function mouseClicked() {
    if (onLanding == false) {
        controls.mousePressed();
    } else {
        landing.mousePressed();
    }
}

function keyPressed() {
  // If controls hasn't loaded yet, do nothing and exit the function
  if (!controls) {
    return;
  }
  controls.keyPressed(keyCode);
}

function windowResized() {
  // If vis hasn't loaded yet, do nothing and exit the function
  if (!vis) {
    return;
  }
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual && vis.selectedVisual.windowResized) {
    vis.selectedVisual.windowResized();
  }
}

//when the window has been resized. Resize canvas to fit
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (vis.selectedVisual.hasOwnProperty("onResize")) {
        vis.selectedVisual.onResize();
    }
}
