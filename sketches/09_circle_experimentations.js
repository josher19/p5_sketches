var noiseFactor = 0;
var centerX;
var centerY;
var radius = 500;
var totalPoints = 50;
var angle;
var noiseFactor = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  centerX = width / 2;
  centerY = width / 2;

  angle = 2 * PI / totalPoints;

  background(0);
  stroke(255, 10);
  noFill();

}

function draw() {
  background(0, 10);
  noFill();
  stroke(255, 20);
  beginShape();
    for (var i = 0; i <= totalPoints; i++) {
      var x = centerX + radius * sin(angle * i) * noise(noise(noiseFactor + (random(-5, 5) * 0.01)) * (random(-1, 1)));
      var y = centerY + radius * cos(angle * i) * noise(noise(noiseFactor + (random(-5, 5) * 0.01)) * (random(-1, 1)));
      curveVertex(x, y, 10, 10);
    }
  endShape(CLOSE);
  noiseFactor += 0.001;

}