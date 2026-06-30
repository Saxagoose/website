const areaLow = 3;
const areaHigh = 4;
const colMin = 1;
const colMax = 4;


const grid = Array.from({length: 100}, () => new Array(colMax).fill(false));
const head = [0, 0]; 
const boxes = document.querySelectorAll('.project-box');

boxes.forEach(box => {

// How many consecutive free columns from head position
let colsLeft = 0;
while (head[1] + colsLeft < colMax && !grid[head[0]][head[1] + colsLeft]) {
  colsLeft++;
}

// Pick a random colSpan that fits in consecutive free space
let colSpan = Math.floor(Math.random() * (colsLeft - colMin + 1)) + colMin;
if (colSpan < 1) colSpan = 1;

  if (colSpan < 1) colSpan = 1; // Make sure colSpan is at least 1
  if (head[1] + colSpan > colMax) colSpan = colsLeft; // Make sure it can't use too many columns

  const area = Math.floor(Math.random() * (areaHigh - areaLow + 1)) + areaLow; // Chooses random area
  const rowSpan = Math.ceil(area / colSpan);

  console.log("colSpan:", colSpan, "rowSpan:", rowSpan);

  // CSS grid is not zero indexed :(
  box.style.gridColumn = `${head[1] + 1} / span ${colSpan}`;
  box.style.gridRow    = `${head[0] + 1} / span ${rowSpan}`;

  // Mark used cells in tracking grid (0-based)
  for (let row = head[0]; row < head[0] + rowSpan; row++) {
    for (let col = head[1]; col < head[1] + colSpan; col++) {
      grid[row][col] = true;
    }
  }

  // Advance head to next free cell
  head[1] += colSpan;
  if (head[1] >= colMax) {
    head[1] = 0;
    head[0]++;
  }

  // Skip any already-filled cells
  while (grid[head[0]] && grid[head[0]][head[1]]) {
    head[1]++;
    if (head[1] >= colMax) {
      head[1] = 0;
      head[0]++;
    }
  }
});