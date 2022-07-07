const grid = document.querySelector(".container");

var gridSize = 16;

function createGrid(gridSize) {
let size = (gridSize * gridSize);
  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener('mouseover', changeColor)
    grid.appendChild(div);
  }
}

createGrid(gridSize);

function changeColor(e) {
    e.target.style.backgroundColor = 'black';
}