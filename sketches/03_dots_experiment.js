var f = 'QGGVSLMHHGCR';
var a = [];

// Parameters.
var x = 0.1;
var y = 0.1;
var r;

function setup() {
  createCanvas(
    windowWidth,
    windowHeight
  );
  background(0);
  noFill();
  stroke(255, 0, 102, 50);
  for (i = 0; i < f.length; i++) {
      a[i] = (f.charCodeAt(i) - 65 - 12) / 10;
  }
  r =  random(0,360)

}


function draw() {

  translate(width / 2, height / 2);
  rotate(radians(frameCount));
  for (i = 0; i < 25; i++) {
      point(x * 200, y * 200);

      var nx = a[0]         + a[1]  * x + a[2]  * x * x
             + a[3] * x * y + a[4]  * y + a[5]  * y * y;
      var ny = a[6]         + a[7]  * x + a[8]  * x * x
             + a[9] * x * y + a[10] * y + a[11] * y * y;

      x = nx; y = ny;
  }

}
