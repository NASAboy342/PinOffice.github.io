

const gpu = new GPU();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const monitor1 = document.getElementById("monitor1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let world = {
    width: canvas.width,
    height: canvas.height
};

let cells = [];
let isPause = false;

// Helper function to get random integer
function getIntRandom(min, max){
    return Math.floor(Math.random() * max) + min;
}

// GPU Kernel for updating positions
const updatePositionsKernel = gpu.createKernel(function(cells, width, height) {
    const cell = cells[this.thread.x];
    const radians = cell.direction * Math.PI / 180;
    const newX = cell.x + cell.speed * Math.cos(radians);
    const newY = cell.y + cell.speed * Math.sin(radians);
    
    // Wrap around world edges
    cell.x = newX < 1 ? width : (newX > width ? 1 : newX);
    cell.y = newY < 1 ? height : (newY > height ? 1 : newY);

    // Energy consumption
    cell.energy -= cell.speed / 10000;

    return cell;
}).setOutput([1500]); // assuming maximum 1500 cells

function createCell(px = 0, py = 0, pColorR = 0, pColorG = 0, pColorB = 0, pdirection = -1, pSpeed = 0, pEnergy = 0) {
    cells.push({
        x: px || getIntRandom(1, world.width),
        y: py || getIntRandom(1, world.height),
        direction: pdirection !== -1 ? pdirection : getIntRandom(1, 360),
        speed: pSpeed || getIntRandom(1.1, 4.1),
        energy: pEnergy || 0.9,
        color: {
            r: pColorR || getIntRandom(0, 255),
            g: pColorG || getIntRandom(0, 255),
            b: pColorB || getIntRandom(0, 255)
        }
    });
}

// Draw cells
function drawCells() {
    cells.forEach(cell => {
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, Math.max(1, cell.energy), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, 0.8)`;
        ctx.fill();
    });
}

// Populate the simulation with cells
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        for (let i = 0; i < 200; i++) { 
            createCell();
        }
    }
    if (e.key === "p") {
        isPause = !isPause;
    }
});

// Main update function
function update() {
    if (isPause) return;

    // Update canvas size and world dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.width = canvas.width;
    world.height = canvas.height;

    // Limit the population
    if (cells.length > 1500) {
        cells.splice(0, cells.length - 1500);
    }

    // Convert cells to a structure that GPU.js can handle
    const cellsForGpu = cells.map(cell => ({
        x: cell.x,
        y: cell.y,
        direction: cell.direction,
        speed: cell.speed,
        energy: cell.energy,
        color: cell.color
    }));

    // Run GPU kernel for position updates and energy consumption
    const updatedCells = updatePositionsKernel(cellsForGpu, world.width, world.height);

    // Map updated GPU cells back to main cells array
    for (let i = 0; i < updatedCells.length; i++) {
        cells[i].x = updatedCells[i].x;
        cells[i].y = updatedCells[i].y;
        cells[i].energy = updatedCells[i].energy;
    }

    // Remove cells with low energy
    cells = cells.filter(cell => cell.energy > 0.2);

    // Update monitor
    monitor1.textContent = cells.length;
}

// Render function
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCells();
}

// Main game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
