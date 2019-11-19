var snowflakes = [];
var amountOfSnowflakes = 2500;
var tree;


function preload() {
  tree = loadImage('tree.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fill(240);
  noStroke();
  for (var i = 0; i < amountOfSnowflakes; i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }
}

function draw() {
  background("blue");

  push();
  imageMode(CENTER);
  image(tree, width / 2, height - tree.height / 2.5, tree.width / 2.25, tree.height / 2.25);
  pop();

  let t = frameCount / 60; // update time

  for (var i = 0; i < snowflakes.length; i++) {
    var tempSnowflake = snowflakes[i];
    tempSnowflake.update(t); // update snowflake position
    tempSnowflake.display(); // draw snowflake
  }
}

function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-2500, height + 5000);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {

    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    rotateIncrementX = 0.25 * map(rotationX, -180, 180, -15, 15);
    this.posY += rotateIncrementX * pow(this.size, 0.5);
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {
  var fs = fullscreen();
  fullscreen(!fs);
}
