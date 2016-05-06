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
  colors = Array.apply(null, Array(totalColors)).map(function(_, num) {
    return color('hsl(' + num + ',80%, 50%)');
  });

// perspective(fovy, aspect, near, far)
}


function draw(){
  colorIndex++;
  scale(8);
  background(0);
  createCoordinates();

  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.02);

  for (var i = 0; i < attractor.length -1; i++) {
    stroke(
      colors[colorIndex % totalColors]
    );
    line(
      attractor[i].x,
      attractor[i].y,
      attractor[i].z,
      attractor[i + 1].x,
      attractor[i + 1].y,
      attractor[i + 1].z
    );
  };
}

function createCoordinates() {
  var dt = 0.005;
  var dx = (sigma * (y-x) * dt);
  var dy = (x * (rho - z) - y) * dt;
  var dz = (x * y - beta * z) * dt;

  x = x + dx;
  y = y + dy;
  z = z + dz;

  var coordinates = createVector(x, y, z);

    // console.log(x, y, z);
  attractor.push(coordinates);

}