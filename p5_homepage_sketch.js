// var particles = [];

// function setup() {
//   createCanvas(
//     window.innerWidth,
//     window.innerHeight
//   );
//   background(255);
// }

// function draw() {
//   background(255);

//   particles.forEach(function(particleCluster) {
//     beginShape();
//     vertex(particleCluster[0].x, particleCluster[0].y);
//     vertex(particleCluster[1].x + 20, particleCluster[1].y + 20);
//     vertex(particleCluster[2].x + 30, particleCluster[2].y + 30);
//     endShape(CLOSE);
//   });

// }

// function Particle(x, y) {
//   this.x = x;
//   this.y = y;
// }

// function ParticleCluster() {
//   this.particle1 = createVector(mouseX, mouseY);
//   this.particle2 = createVector(mouseX, mouseY);
//   this.particle3 = createVector(mouseX, mouseY);

//   this.move = function() {

//   }
// }