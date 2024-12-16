const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// const monitor1 = document.getElementById("monitor1");
// const monitor2 = document.getElementById("monitor2");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let world = {
    x:1,
    y:1,
    width:canvas.width,
    height:canvas.height
}


function drawWorld() {
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = 3; 
    ctx.strokeRect(world.x, world.y, world.width, world.height);
}


// Update game objects
async function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.height = canvas.height;
    world.width = canvas.width;

}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld();
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
