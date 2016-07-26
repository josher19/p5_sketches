var particles = [];
var immortalParticles = 20;
var connectRadius = 80;
var particleSize = 3;
var dispersionRate = 5;

// set the boundaries for the particles
var wStart = 0.60;
var hEnd = 0.20;

var r = 237;
var g = 34;
var b = 93;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  seedParticles();
  img = loadImage("p5jshomescreen.png");
}

function draw() {
  background(255);

  image(img, 0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(function(particle1, i){
    particle1.render();
    particle1.move();

    particles.forEach(function(particle2, i2) {
      if (dist(
        particle1.coordinates.x,
        particle1.coordinates.y,
        particle2.coordinates.x,
        particle2.coordinates.y
      ) >= connectRadius) {
        return;
      }

      particles.forEach(function(particle3, i3) {
        if (dist(
          particle2.coordinates.x,
          particle2.coordinates.y,
          particle3.coordinates.x,
          particle3.coordinates.y
        ) >= connectRadius)
        {
          return;
        }
        noStroke();
        strokeWeight(0.5);
        stroke(r, g, b, 1);
        fill(r, g, b, 6);
        beginShape();
          vertex(particle1.coordinates.x, particle1.coordinates.y);
          vertex(particle2.coordinates.x, particle2.coordinates.y);
          vertex(particle3.coordinates.x, particle3.coordinates.y);
        endShape();
      });
    });
  });
}

function seedParticles() {
  for (i = 0; i <= immortalParticles; i++) {
    var v = random(0.3, 0.8);
    var velocity = createVector(
      random(-v, v),
      random(-v, v)
    );
    var particle = new Particle(
      // get a radial dispersion by + or - i
      random((width * wStart) - i * dispersionRate, width),
      random(0, (height * 0.20) + i * dispersionRate),
      velocity,
      true
    );
    particles.push(particle);
  }
}

function Particle(x, y, velocity, immortality) {
  this.stay = 0;
  this.coordinates = createVector(x, y);
  this.velocity = velocity;
  this.lifeSpan = 0;
  this.immortality = immortality;

  this.move = function() {
    this.coordinates.x += this.velocity.x;
    this.coordinates.y += this.velocity.y;

    // left off here
    // when one exists the a given area, die?
    // and when it dies, introduce a new one in the spawn area area
    // and when one spawns, make it pulse
    if (this.immortality) {
      // if (this.coordinates.x => height * )
    }
    // if (this.coordinates.x => )
  }

  this.render = function() {
    strokeWeight(particleSize);
    stroke(r, g, b, 100);
    point(
      this.coordinates.x,
      this.coordinates.y
    );
  }

}



// function windowResized() {
//    createCanvas(
//     window.innerWidth,
//     window.innerHeight
//   );
//   resetEnvironment();
// }

// function resetEnvironment() {
//   particles = [];
//   seedParticles();
//   background(0);
// }