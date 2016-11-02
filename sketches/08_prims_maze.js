var spacing   = 0;
var lineWidth = 7;
var lineWidthOffset = 3.25;

var totalRows = 0;
var totalColumns = 0;
var frontier = {}
var grid = []

var colors;
var totalColors = 360;
var cellColor = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colors = Array.apply(null, Array(totalColors)).map(function(_, num) {
    return color('hsl(' + num + ', 40%, 50%)');
  });
  spacing = (height) / 60;
  makeGrid();
  strokeWeight(lineWidth);

  // start in center
  row = int(totalRows / 2);
  col = int(totalColumns / 2);

  // start in upper-left
  // row = 0;
  // col = 0;
  markCell(row, col);
  expandFrontier(row, col);
}

function draw() {
  frontier_keys = Object.keys(frontier);
  var pick = Math.round(
    random(frontier_keys.length - 1)
  );
  cell = frontier_keys[pick];
  row  = frontier[cell][0];
  col  = frontier[cell][1];
  delete frontier[cell];
  // mark frontier cell as used
  markCell(row, col);
  // then tear a random wall adjacent to any given marked neighbor
  removeWall(row, col);
  expandFrontier(row, col);
  if (frontier_keys.length == 1) {
    noLoop();
  }
}

function makeGrid() {
  stroke(48);
  var counter = 0;
  var row = 0, col = 0;
  for (var y = 0; y <= height; y += spacing) {
    grid.push([])
    for (var x = 0; x <= width; x += spacing) {
      strokeWeight(2);
      grid[row].push(col);
      fill(35);
      rect(x, y, spacing, spacing);
      col++;
    }
    row++;
  }
  totalRows = grid.length;
  totalColumns = grid[0].length;
}

function markCell(row, col) {
  stroke(20);
  fill(colors[cellColor]);
  grid[row][col] = true;
  rect(col * spacing, row * spacing, spacing, spacing);
  if (frameCount % 7 == 0) {
    cellColor ++;
    cellColor = cellColor % totalColors;
  }
}

function expandFrontier(row, col) {
  newFrontier = getAdjacentCells(row, col, 'number');
  newFrontier.forEach(function(coord) {
    var row = coord[0], col = coord[1];
    cell = grid[row][col];
    if (!(cell in frontier)) {
      frontier[cell] = [row, col];
      stroke(20);
      fill(70);
      rect(col * spacing, row * spacing, spacing, spacing);
    }
  });
}

function removeWall(row, col) {
  // get all neighbors marked neighbors
  ac = getAdjacentCells(row, col, 'boolean');
  pick = ac[Math.round(random(ac.length - 1))];
  var ac_row = pick[0], ac_col = pick[1];
  cell = grid[ac_row][ac_col];

  if (ac_col < col) {
    // adjacent to the left
    col = (col * spacing) - lineWidth;
    row = row * spacing + lineWidth - lineWidthOffset;
    w   = lineWidth * 2;
    h   = spacing - lineWidth
  } else if (ac_col > col) {
    // adjacent to the right
    col = ((col + 1) * spacing) - lineWidth;
    row = (row * spacing) + lineWidth - lineWidthOffset;
    w   = lineWidth * 2;
    h   = spacing - lineWidth;
  } else if (ac_row < row) {
    // adjacent above
    col = (col * spacing) + lineWidth - lineWidthOffset;
    row = (row * spacing) - lineWidth;
    w   = spacing - lineWidth;
    h   = lineWidth * 2;
  } else {
    // adjacent below
    col = (col * spacing) + lineWidth - lineWidthOffset;
    row = ((row + 1) * spacing) - lineWidth;
    w   = spacing - lineWidth;
    h   = lineWidth * 2;
  }
  noStroke();
  rect(col, row, w, h);
}

function getAdjacentCells(row, col, markedAs) {
  adjacentCells = [
    [row, col + 1],
    [row, col - 1],
    [row + 1, col],
    [row - 1, col]
  ];
  adjacentCells = adjacentCells.filter(function(coord) {
    var row = coord[0], col = coord[1];
    if (row <= totalRows - 1 && row >= 0 && col <= totalColumns - 1 && col >= 0) {
      return typeof grid[row][col] === markedAs;
    }
  });
  return adjacentCells;
}
