var particles = [];
var immortalParticles;
var connectRadius;
var particleSize = 3;
var maxParticleSpeed = 0.1;//1;
var mouseVelocity = 1.5;
var glowFactor = 5;

//0.004;//0.05;

var pMouseX;
var pMouseY;

var pulseSize = 6;

var r = 237;
var g = 34;
var b = 93;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );

  setEnvironmentVariables();
  seedParticles();
  img = loadImage("p5jshomescreen.png");
  pMouseX = mouseX;
  pMouseY = mouseY;
}

function setEnvironmentVariables() {
  immortalParticles = map(
    width * height / 10000,
    10,
    120,
    20,
    70
  );
  connectRadius = map(
    immortalParticles,
    10,
    100,
    50,
    120
  );
}

function draw() {
  background(255);
  image(img, 0, 0, window.innerWidth, window.innerHeight);
  particles.forEach(function(particle1, i){

    if (!particle1.immortality) {
      if ((particle1.coordinates.x >= width || particle1.coordinates.x <= 0)
        || (particle1.coordinates.y >= height || particle1.coordinates.y <= 0)) {
        particles.remove(i);
      }
    }

    particle1.render();
    particle1.move();
    particle1.connections++;
    particle1.glow();

    particles.forEach(function(particle2, i2) {

      // particle2.move();
      if (dist(
        particle1.coordinates.x,
        particle1.coordinates.y,
        particle2.coordinates.x,
        particle2.coordinates.y
      ) >= connectRadius) {
        return;
      }

      particle2.move();
      particle2.connections++;

      particles.forEach(function(particle3, i3) {


        // particle3.move();
        if (dist(
          particle2.coordinates.x,
          particle2.coordinates.y,
          particle3.coordinates.x,
          particle3.coordinates.y
        ) >= connectRadius)
        {
          particle3.connections = 0;
          return;
        }


        particle3.move();
        particle3.connections++;

        noStroke();
        strokeWeight(1);
        stroke(r, g, b, 5);
        noFill();
        // fill(r, g, b, 10);

        triangle(
          particle1.coordinates.x,
          particle1.coordinates.y,
          particle2.coordinates.x,
          particle2.coordinates.y,
          particle3.coordinates.x,
          particle3.coordinates.y
        );
        particle3.glow();

      });
    });
  });

  pMouseX = mouseX;
  pMouseY = mouseY;

}

function seedParticles() {
  for (i = 0; i <= immortalParticles; i++) {
    var velocity = createVector(
      random(-maxParticleSpeed, maxParticleSpeed),
      random(-maxParticleSpeed, maxParticleSpeed)
    );
    var particle = new Particle(
      random(0, width),
      random(0, height),
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
  // this.lifeSpan = 0;
  this.pulsed = pulseSize;
  this.immortality = immortality;
  this.connections = 0;

  this.move = function() {
    this.coordinates.add(this.velocity);

    if (this.immortality) {
      this.bounce();
    }
  }

  this.bounce = function() {
    if (this.coordinates.x <= 0 || this.coordinates.x >= width) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.coordinates.y <= 0 || this.coordinates.y >= height) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  this.render = function() {
   strokeWeight(particleSize);
    stroke(r, g, b, 100);
    point(
      this.coordinates.x,
      this.coordinates.y
    );
  }

  this.pulse = function() {
    if (!this.immortality && this.pulsed <= 8) {
      strokeWeight(particleSize + this.pulsed);
      stroke(r, g, b, 255 - this.pulsed);
      point(
        this.coordinates.x,
        this.coordinates.y
      );
      this.pulsed -= 1;
    }
  }

  this.glow = function() {
    strokeWeight(particleSize + this.connections * glowFactor);
    // stroke(r, g, b, 10);
    stroke(r, g, 70, 15);
    point(
      this.coordinates.x,
      this.coordinates.y
    );
  }
}

function mouseMoved() {
  if (frameCount % 5 == 0) {
    var v = createVector(
      mouseX - pMouseX > 0 ? -maxParticleSpeed * mouseVelocity : maxParticleSpeed * mouseVelocity,
      mouseY - pMouseY > 0 ? -maxParticleSpeed * mouseVelocity : maxParticleSpeed * mouseVelocity
    );
    var particle = new Particle(
      mouseX,
      mouseY,
      v,
      false
    );
    particles.push(particle);
    }

}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function windowResized() {
   createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  resetEnvironment();
}

function resetEnvironment() {
  particles = [];
  seedParticles();
  setEnvironmentVariables();
  // immortalParticles = (width / 100) * (height / 100);
  // connectRadius = constrain(immortalParticles, 60, 100);
  background(0);
}