const grid = document.querySelector(".container");
const clear = document.querySelector("#clear");
const changeGrid = document.querySelector("#gridSize");
var slider = document.getElementById("rangeInput");

clear.addEventListener('click', clearGrid);
changeGrid.addEventListener('click', newGrid);

createGrid(16);

function createGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
  let size = gridSize * gridSize;
  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    grid.appendChild(div);
    div.addEventListener("mouseover", draw);
  }
}

function draw(e) {
  e.target.style.backgroundColor = "black";
}

function clearGrid() {
  var cells = grid.querySelectorAll("div");
  cells.forEach((cell) => (cell.style.backgroundColor = "white"));
}

function newGrid() {
  document.querySelectorAll(".cell").forEach((e) => e.remove());
  createGrid(slider.value);
}
