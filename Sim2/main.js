// main.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const monitor1 = document.getElementById("monitor1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const world = {
    x: 1,
    y: 1,
    width: canvas.width,
    height: canvas.height
};

let worker = new Worker('worker.js'); // Initialize the worker
let copiedCells = []; // Store copiedCells for rendering

// Send initial setup to worker
worker.postMessage({ type: 'initialize', payload: { world } });

function drawWorld() {
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = 3; 
    ctx.strokeRect(world.x, world.y, world.width, world.height);
}

function drawCells() {
    copiedCells.forEach(cell => {
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, cell.energy, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, ${cell.isFemale ? 0.5 : 0.8})`;
        ctx.fill();
    });
}

// Handle spacebar and "p" key presses for cell creation and pausing
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        for (let i = 0; i < 200; i++) {
            worker.postMessage({ type: 'createCell' }); // Request cell creation from worker
        }
    }
    if (e.key === "p") {
        worker.postMessage({ type: 'togglePause' }); // Toggle pause
    }
});

function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.width = canvas.width;
    world.height = canvas.height;

    worker.postMessage({ type: 'update' }); // Ask worker to update copiedCells
}

// Receive messages from the worker
worker.onmessage = function(e) {
    const { type, copiedCells: updatedCells } = e.data;

    if (type === 'updateComplete') {
        copiedCells = updatedCells; // Update copiedCells for rendering
        monitor1.textContent = copiedCells.length;
    }
};

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWorld();
    drawCells();
}

// Main game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
