spacing   = 0;
lineWidth = 3;
totalRows = 0;
totalColumns = 0;


// delete from frontier when a frontier cell has been discovered
frontier = []
grid = []

function setup() {
  createCanvas(901, 701);
  // to accomodate for cut off pixel at the end of the maze
  spacing = (height - 1) / 50;
  makeGrid();
  markCell(0, 0);
  expandFrontier(0, 0);
  frameRate(20);
}


function draw() {
  var pick = Math.round(
    random(frontier.length - 1)
  );

  cell = frontier[pick];
  markCell(cell[0], cell[1]);
  expandFrontier(cell[0], cell[1]);

  // # maybe try not to favor top or bottom....
  // # get all cells to the top, left, bottom, right
  // # if any of these are marked as "x"
  // # then we can draw a huge line between the two of them
  // # if cell to the t, left, bottom, right is marked as "x"
  // # then make a big line between the two of them

  // markCell();
  // must do only two things:
  // 1) mark cell
  // 1) put this cell into already-explored
  // 2) add all of it's neighbors into the frontier
  // 3) take next cell randomly from the frontier, and delete it from the array

}

function markCell(row, column) {
  grid[row][column] = 'X';
  // draw here
  fill(255);
  rect(row * spacing, column * spacing, spacing, spacing);
}

function expandFrontier(row, column) {
  // don't add anything into the frontier if it's aleady there.
  if (column - 1 > 0) {
    frontier.push([row, column - 1])
  }
  // bottom
  if (row + 1 < totalRows) {
    frontier.push([row, column + 1])
  }
  // left
  if (row - 1 > 0) {
    frontier.push([row - 1, column])
  }
  if (row + 1 < totalColumns) {
    // right
    frontier.push([row + 1, column])
  }
}


function makeGrid() {
  strokeWeight(3);
  var counter = 0;
  var row = 0;
  var c = 0;
  for (var y = 0; y <= height; y += spacing) {
    grid.push([])
    for (var x = 0; x <= width; x += spacing) {
      grid[row].push(c);
      // draw grid while making it
      fill(50);
      rect(x, y, spacing, spacing);
      // we might not need this.
      // it might be best to just use none and true
      c++;
    }
    row++;
  }
  totalRows = grid.length;
  totalColumns = grid[0].length;
}

function Cell() {
  // the cell's ID
  this.num = n;
  // contains the X, Y coordinate on the grid
  this.x = x;
  this.y = y;
  this.marked = False;

}