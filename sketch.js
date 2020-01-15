// sound global variables
var noiseSound;
var punchSound;
var chefAudio

// images global variables
var tv;
var noiseImg;
var chef;
var pow;
var hand;

// punch counter
var punchCounter = 0;

function preload() {
  //load sounds
  noiseSound = loadSound("./assets/noise.mp3");
  punchSound = loadSound("./assets/punch.m4a");
  chefAudio = loadSound("./assets/chef-audio.m4a");

  // load images
  tv = loadImage("./assets/television.png");
  noiseImg = loadImage("./assets/noise.png");
  chef = loadImage("./assets/chef.png");
  chefNoise = loadImage("./assets/chef-noise.png");
  pow = loadImage("./assets/pow.png");
  hand = loadImage("./assets/hand.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // start sound
  noiseSound.loop();
  chefAudio.loop();

 // set volumes
  chefAudio.amp(0);
  noiseSound.amp(1.0);
}

function draw() {
  background(0);

  // instruction text
  var instructions = createDiv("Oh no, I can't watch my favourite show! <br> SHAKE your phone to hit the TV and make it work again!");
  instructions.style('user-select: none; position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); color: white; text-align: center; font-family: "Source Code Pro"; font-size: 20pt');

  // display images
  imageMode(CENTER);
  image(noiseImg, width / 2, height * 0.6, noiseImg.width, noiseImg.height);

  //tv show appears gradually after some punches
  if (punchCounter >= 2) {
    image(chefNoise, width / 2, height * 0.6, chefNoise.width, chefNoise.height);
  }
  if (punchCounter >= 4) {
    image(chef, width / 2, height * 0.6, chef.width, chef.height);
  }

  image(tv, width / 2, height * 0.6, tv.width, tv.height);
  image(hand, width * 0.3, height * 0.6 - tv.height + accelerationZ, hand.width, hand.height);

  // shaking interaction
  if (accelerationZ >= 10) {
    image(pow, width / 2, height * 0.6 - tv.height / 2, pow.width, pow.height);
    punchSound.play();
    punchCounter++;
  }

  // increase voice volume and reduce noise volume after every punch
  var chefVolume = map(punchCounter, 1, 5, 0.1, 1.0);
  var noiseVolume = map(punchCounter, 1, 5, 1.0, 0.2)
  chefAudio.amp(chefVolume);
  noiseSound.amp(noiseVolume);

  // after some punches open a link to the show
  if (punchCounter >= 5) {
    window.open("https://www.youtube.com/watch?v=Sj4FVErXDJA", "_self");
  }
}


// prevent dragging the screen around
function touchMoved() {
  return false;
}
// iOS 13 request to access motion and orientation data
function touchEnded(event) {
  DeviceOrientationEvent.requestPermission()
}
