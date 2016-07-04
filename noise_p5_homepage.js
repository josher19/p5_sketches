// var particles = [];
// // amount of particles per row
// var pPerRow = 150;
// var cIndex = 0;
// var noiseScale = 400;

// function setup() {
//   colors = [
//     color(0, 160, 250, 30),
//     color(0, 150, 250, 30),
//     color(60, 250, 255, 30),
//     color(20, 150, 255, 30),
//     // color(20, 20, 20, 40),
//     color(50, 10, 5, 30),


//         color(20, 150, 255, 30),
//     color(255, 150, 0, 30),
//     color(200, 190, 0, 30),
//     color(250, 190, 0, 30)
//     // color(250, 190, 0, 80)
//   ];

//   createCanvas(
//     window.innerWidth,
//     window.innerHeight
//   );
//   var bOpacity = 0;
//   var bYstart = 0;
//   noStroke();
//   for (var i = 0; i <= height; i++) {
//     fill(bOpacity);
//     rect(0, bYstart, window.innerWidth, window.innerHeight);
//     if (bYstart <= window.innerHeight * 0.08) {
//     } else {
//       bOpacity++;
//     }
//     bYstart += 3;
//   }
//   seedParticles();
// }

// function draw() {
//   particles.forEach(function(particle) {
//     particle.move();
//     particle.render();
//   });
//   // seedMouseParticle();
// }

// // function seedMouseParticle() {
// //   var c = Math.round(
// //     frameCount % colors.length
// //   );
// //   var particle = new Particle(
// //     mouseX,
// //     mouseY,
// //     c
// //   );

// //   particles.push(particle);
// // }

// function seedParticles() {
//   var wInterval = width / pPerRow;
//   var hInterval = height / pPerRow;
//   var paddingH = height * 0.80;

//   for (var i = 0; i <= width; i+= wInterval) {
//     for (var j = 0; j <= height - paddingH; j += hInterval) {

//       var c = Math.round(
//         cIndex % colors.length
//       );
//       cIndex++;
//       var particle = new Particle(
//         // add guassian to randomly disperse starting points
//         i + randomGaussian(-30, 40),
//         j + randomGaussian(-30, 40),
//         c
//       );
//       particles.push(particle);
//     }
//   }
// }

// function Particle(x, y, colorIndex) {
//   this.position = createVector(x, y);
//   this.color = colorIndex;

//   this.move = function() {
//     var angleNoise = noise(
//       noise(this.position.x / noiseScale, this.position.y / noiseScale) * 10,
//       noise(frameCount * noise(frameCount), frameCount / noise(frameCount)) * 0.03
//     ) * noiseScale;

//     var density = 1;
//     this.position.x += cos(cos(angleNoise) * (1.5 + noise(frameCount))) * density;
//     this.position.y += sin(sin(angleNoise) * (1.5 + noise(frameCount))) * density;

//   }

//   this.render = function() {
//     stroke(colors[this.color]);
//     point(
//       this.position.x,
//       this.position.y
//     );
//   }
// }

// function resetEnvironment() {
//   particles = [];
//   seedParticles();
//   background(0);
// }

// function windowResized() {
//    createCanvas(
//     window.innerWidth,
//     window.innerHeight
//   );
//   resetEnvironment();
// }