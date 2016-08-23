var particles = [];
// amount of particles per row
var pPerRow = 150;
var cIndex = 0;
var noiseScale = 400;

function setup() {

  // psychedelic purple
  colors = [
    color(0, 160, 250, 30),
    color(0, 150, 250, 30),
    color(60, 250, 255, 30),
    color(20, 150, 255, 30),
    color(50, 10, 5, 30),
    color(20, 150, 255, 30),
    color(255, 150, 0, 30),
    color(200, 190, 0, 30),
    color(250, 190, 0, 30)
  ];

  // martian red
  // colors = [
  //   color(166, 145, 80, 30),
  //   color(194, 167, 50, 30),
  //   color(194, 173, 50, 30),
  //   color(202, 188, 50, 30),
  //   color(85, 74, 30, 30),
  //   color(151, 132, 30, 30),
  //   color(219, 209, 40, 30),
  //   color(85, 74, 81, 30),
  //   color(25,154,28, 30)
  // ];

  // desert sand
  // colors = [
  //   color(194,162,128, 30),
  //   color(194,173,128, 30),
  //   color(165,144,79, 30),
  //   color(213,202,168, 30),
  //   color(188,170,115, 30),
  //   color(245,242,234, 30),
  //   color(45,40,22, 30),
  //   color(165,144,79, 30),
  //   color(188,170,115, 30)
  // ]

  createCanvas(
    window.innerWidth,
    window.innerHeight
  );

  // psychedelic purple
  background(20, 20, 140);

  // martian red
  // background(90, 0, 0);

  // desert sand
  // background(85, 63, 34);

  seedParticles();
}

function draw() {
  particles.forEach(function(particle) {
    particle.move();
    particle.render();
  });
}

function seedParticles() {
  var wInterval = width / pPerRow;
  var hInterval = height / pPerRow;
  var paddingH = height * 0.80;

  for (var i = 0; i <= width; i+= wInterval) {
    for (var j = 0; j <= height; j += hInterval) {

      var c = Math.round(
        cIndex % colors.length
      );
      cIndex++;
      var particle = new Particle(
        // add guassian to randomly disperse starting points
        i + randomGaussian(-30, 40),
        j + randomGaussian(-30, 40),
        c
      );
      particles.push(particle);
    }
  }
}

function Particle(x, y, colorIndex) {
  this.position = createVector(x, y);
  this.color = colorIndex;

  this.move = function() {
    var angleNoise = noise(
      noise(this.position.x / noiseScale, this.position.y / noiseScale) * 10,
      noise(frameCount * noise(frameCount), frameCount / noise(frameCount)) * 0.03
    ) * noiseScale;

    var density = 1;

    this.position.x += cos(cos(angleNoise)) * (1.5 + (noise(frameCount))) * density;
    this.position.y += sin(sin(angleNoise)) * (1.5 + (noise(frameCount))) * density;
  }

  this.render = function() {
    stroke(colors[this.color]);
    point(
      this.position.x,
      this.position.y
    );
  }
}


