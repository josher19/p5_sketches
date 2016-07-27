var particles = [];
var immortalParticles;
var connectRadius;
var particleSize = 3;
var dispersionRate = 6;
var maxParticleSpeed = 0.004;//0.05;
var pMouseX;
var pMouseY;

var pulseSize = 6;

// set the boundaries for the particles
var wStart = 0;//0.60;
var hEnd = 1;//0.20;

var r = 237;
var g = 34;
var b = 93;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  immortalParticles = width * height / 9000;
  console.log(immortalParticles);
  connectRadius = constrain(immortalParticles, 80, 100);
  seedParticles();
  img = loadImage("p5jshomescreen.png");
  pMouseX = mouseX;
  pMouseY = mouseY;
}

function draw() {
  background(255);
  image(img, 0, 0, window.innerWidth, window.innerHeight);
  particles.forEach(function(particle1, i){

    if (!particle1.immortality) {
      if ((particle1.coordinates.x >= width || particle1.coordinates.x <= 0)
        || (particle1.coordinates.y >= height || particle1.coordinates.y <= 0)) {
        particles.remove(i);
        console.log("removed");
      }
    }
      // if ((!particle1.immortality)
      //   &&
      //    {
      //   particles.remove(i)
      // }
      // }

    particle1.render();
    particle1.move();
    particle1.connections++;
    particle1.pulse();

    particles.forEach(function(particle2, i2) {

      particle2.move();
      if (dist(
        particle1.coordinates.x,
        particle1.coordinates.y,
        particle2.coordinates.x,
        particle2.coordinates.y
      ) >= connectRadius) {
        return;
      }

      particle2.connections++;

      particles.forEach(function(particle3, i3) {


        particle3.move();
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

        particle3.connections++;

        noStroke();
        strokeWeight(1);
        stroke(r, g, b, 1);
        fill(r, g, b, 8);

        triangle(
          particle1.coordinates.x,
          particle1.coordinates.y,
          particle2.coordinates.x,
          particle2.coordinates.y,
          particle3.coordinates.x,
          particle3.coordinates.y
        );

        // particle3.glow();
      });
    });
  });

  pMouseX = mouseX;
  pMouseY = mouseY;

}

function seedParticles() {
  console.log(immortalParticles);
  for (i = 0; i <= immortalParticles; i++) {
    var velocity = createVector(
      random(-maxParticleSpeed, maxParticleSpeed),
      random(-maxParticleSpeed, maxParticleSpeed)
    );
    var particle = new Particle(
      // get a radial dispersion by + or - i
      // random((width * wStart) - i * dispersionRate, width),
      // random(0, (height * hEnd) + i * dispersionRate),
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
    // this.coordinates.x += this.velocity.x;
    // this.coordinates.y += this.velocity.y;
    this.coordinates.add(this.velocity);

    // left off here
    // when one exists the a given area, die?
    // and when it dies, introduce a new one in the spawn area area
    // and when one spawns, make it pulse
    if (this.immortality) {
      if (this.coordinates.x <= width * wStart - immortalParticles * dispersionRate || this.coordinates.x >= width) {
        this.velocity.x = this.velocity.x * -1;
      }
      if (this.coordinates.y >= height * hEnd + immortalParticles * dispersionRate || this.coordinates.y <= 0) {
        this.velocity.y = this.velocity.y * -1;
      }
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

  // this.glow = function() {
  //   // strokeWeight(0.05);
  //   // stroke(255);
  //   // noFill();
  //   // // fill(255, 0);
  //   // ellipse(
  //   //   this.coordinates.x,
  //   //   this.coordinates.y,
  //   //   particleSize
  //   // );
  //   strokeWeight(particleSize + this.connections * 3);
  //   stroke(r, 20, 60, 2);
  //   point(
  //     this.coordinates.x,
  //     this.coordinates.y
  //   );
  // }
}

function mouseMoved() {
  if (frameCount % 5 == 0) {
    var v = createVector(
      mouseX - pMouseX > 0 ? -maxParticleSpeed * 2 : maxParticleSpeed * 2,
      mouseY - pMouseY > 0 ? -maxParticleSpeed * 2: maxParticleSpeed * 2
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
  immortalParticles = (width / 100) * (height / 100);
  connectRadius = constrain(immortalParticles, 60, 100);
  background(0);
}