// make procedurally generated landscape
// and use music as input
// set height and stuff according to leapmotion
var verticesArray = [];
var song;
var amp;
// get user ID
var user = SC.get('/resolve', {
  url: 'https://soundcloud.com/nicolas-jaar'
});
console.log(user);

// initialize soundcloud using client ID
SC.initialize({
  client_id: CLIENT_ID
});

// Nicolas Jaar
var userId = 12881211;
// var tracks = SC.get("/tracks", {
//     user_id: userId,
//     limit: 100
// });

// console.log(tracks);

var songUrl = "https://api.soundcloud.com/tracks/38288675/stream";
var streamUrl = songUrl + "?client_id=" + CLIENT_ID;

// loadSound.

// SC.stream('/users/' + userId + '/tracks/1').then(function(player){
//   player.play();
// });

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight,
    WEBGL
  );
  // callback circumvents having to use the preload function
  song = loadSound(streamUrl, loaded);
  song.setVolume(0.1);
  amp = new p5.Amplitude();
}

function loaded() {
  song.play();
}

function draw() {
  background(0);
  stroke(255);

for(var i = 0; i < 500; i+=100){
  push();
  fill(i * 0.1, 100, 100);

  //line
  translate(0, 100, 0);
  line(-100, 0, i, 100, 0, i);

  //triangles
  translate(0, 100, 0);
  triangle(
    0, sin( i + frameCount * 0.1) * 10, i,
    60, 60, i,
    -60, 60, i);

  //quad
  translate(0, 200, 0);
  quad(
    -100, i, 0,
    100, i, 0,
    -100, 100, i,
    100, 100, i
    );
  pop();
}


}

function generateVertices() {
  // for (int x = 0; x < cols; x++) {
  //   for (int y = 0; y < rows; y++) {

  //   }
  // }
}