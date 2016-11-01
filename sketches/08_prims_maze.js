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
  spacing = (height - 1) / 20;
  makeGrid();
  markCell(0, 0);
  expandFrontier(0, 0);
  frameRate(60);
}

function draw() {
  frontier_keys = Object.keys(frontier);
  var pick = Math.round(
    random(frontier_keys.length - 1)
  );
  cell = frontier_keys[pick];
  delete frontier[pick];
  row  = frontier[cell][0];
  col  = frontier[cell][1];
  markCell(row, col);
  expandFrontier(row, col);


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

function markCell(row, col) {
  grid[row][col] = 'X';
  // draw here
  fill(255);
  rect(row * spacing, col * spacing, spacing, spacing);
}

function expandFrontier(row, col) {
  addFrontier(row, col - 1);
  addFrontier(row, col + 1);
  addFrontier(row + 1, col);
  addFrontier(row - 1, col);
}


function addFrontier(row, col) {
  if (row <= totalRows && row >= 0 && col <= totalColumns && col >= 0) {
    cell = grid[row][col];
    if (!(cell in frontier)) {
      frontier[cell] = [row, col];
      fill(20, 50, 50);
      rect(row * spacing, col * spacing, spacing, spacing);
    }
  }
}


function makeGrid() {
  strokeWeight(3);
  var counter = 0;
  var row = 0;
  var col = 0;
  for (var y = 0; y <= height; y += spacing) {
    grid.push([])
    for (var x = 0; x <= width; x += spacing) {
      grid[row].push(col);
      // draw grid while making it
      fill(50);
      rect(x, y, spacing, spacing);
      // we might not need this.
      // it might be best to just use none and true
      col++;
    }
    row++;
  }
  totalRows = grid.length - 1;
  totalColumns = grid[0].length - 1;
}

function Cell() {
  // the cell's ID
  this.num = n;
  // contains the X, Y coordinate on the grid
  this.row = row;
  this.col = col;
  this.marked = false;

}