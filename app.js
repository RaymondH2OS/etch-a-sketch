const DEFAULT_GRID = 16;
const DEFAULT_MODE = "color";
const DEFAULT_COLOR = "black";

const grid = document.querySelector(".grid");
const clear = document.querySelector("#clear");
const changeGrid = document.querySelector("#gridSize");
const slider = document.getElementById("rangeInput");
const showGridSize = document.getElementById("showGridSize");
const cells = document.querySelector(".cell");
const colorBtn = document.getElementById("color");
const eraserBtn = document.getElementById("eraser");
const randomBtn = document.getElementById("random");
const colorPicker = document.getElementById("colorPicker");

// Event Listeners
clear.addEventListener("click", clearGrid);
changeGrid.addEventListener("click", newGrid);
colorBtn.onclick = () => setCurrentMode("color");
randomBtn.onclick = () => setCurrentMode("random");
eraserBtn.onclick = () => setCurrentMode("eraser");
colorPicker.oninput = (e) => setCurrentColor(e.target.value);

let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

// Function to create grid
function createGrid(gridSize) {
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr`;
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
  let size = gridSize * gridSize;
  for (let i = 0; i < size; i++) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.addEventListener("mouseover", draw);
    div.addEventListener("mousedown", draw);
    grid.appendChild(div);
  }
}

// Function for drawing on grid
function draw(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  e.preventDefault();
  if (currentMode === "random") {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    color = "#" + randomColor;
    e.target.style.backgroundColor = color;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  }
}

// Function to clear grid
function clearGrid() {
  var cells = grid.querySelectorAll("div");
  cells.forEach((cell) => (cell.style.backgroundColor = "white"));
}

// Function to generate new grid
function newGrid() {
  document.querySelectorAll(".cell").forEach((e) => e.remove());
  createGrid(slider.value);
}

// Function to show current grid size
function gridSize(value) {
  showGridSize.textContent = `${value}x${value}`;
}

// Function for which color to use based on button click
function activateButton(newMode) {
  if (currentMode === "random") {
    randomBtn.classList.remove("active");
  } else if (currentMode === "color") {
    colorBtn.classList.remove("active");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("active");
  }

  if (newMode === "random") {
    randomBtn.classList.add("active");
  } else if (newMode === "color") {
    colorBtn.classList.add("active");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  createGrid(DEFAULT_GRID);
  gridSize(DEFAULT_GRID);
  activateButton(DEFAULT_MODE);
};
