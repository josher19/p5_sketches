var y = 0.01;
var x = 0.01;
var z = 0.01;

var sigma = 10;
var rho = 28;
var beta = 8/3;

var colors;
var colorIndex = 0;
var totalColors = 360;

var attractor = [];

function setup(){
  createCanvas(
    windowWidth,
    windowHeight,
    WEBGL
  );
  // create an array of all 360 colors on HSL spectrum to loop through
  // this prevents caching issues
  colors = Array.apply(null, Array(totalColors)).map(function(x, num) {
    // return color('hsl(' + num + ',80%, 50%)');
    return color(num);
  });

// perspective(fovy, aspect, near, far)

  while (attractor.length < 3000) {
    createCoordinates();
  }
  // initial points on attractor
  attractor.length = 0;
  while (attractor.length < 3000) {
    createCoordinates();
  }

}

function draw(){
  colorIndex++;
  scale(8)

  // translate(0, 0, -80);
  // rotating camera
  let camX = map(mouseX, 0, width, -200, 200);
  let camY = map(mouseY, 0, height, -200, 200);
  camera(camX, camY, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  stroke(255);
  noFill();

  createCoordinates();

  rotateZ(frameCount * 0.02);
  // rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);

  if (!attractor.length) return;
  beginShape();
  stroke(
    colorIndex % totalColors
  );
  for (var i = 0; i < attractor.length - 1; i++) {
    vertex(
      attractor[i].x,
      attractor[i].y,
      attractor[i].z
    );
  }
  endShape();
}

function createCoordinates() {
  // var dt = 0.0095;
  var dt = 0.0095 * noise(frameCount);
  var dx = (sigma * (y-x) * dt);
  var dy = (x * (rho - z) - y) * dt;
  var dz = (x * y - beta * z) * dt;

  x = x + dx;
  y = y + dy;
  z = z + dz;

  var coordinates = new p5.Vector(x, y, z);

    // console.log(x, y, z);
  attractor.push(coordinates);

}

// function deleteCoordinates() {

// }
