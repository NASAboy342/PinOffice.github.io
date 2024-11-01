const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];
const projectiles = [];
const player = { x: 0, y: 0, speed: 5 };
const hitPoint = [];

let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let dragEndX = 0;
let dragEndY = 0;

// Generate random circles in infinite space
function createCircles() {
    for (let i = 0; i < 50; i++) {
        circles.push({
            x: Math.random() * 4000 - 2000,
            y: Math.random() * 4000 - 2000,
            radius: Math.random() * 20 + 10,
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * 1.5 - 0.75,
        });
    }
}

// Handle key presses to move the view
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w": offsetY += player.speed; break;
        case "s": offsetY -= player.speed; break;
        case "a": offsetX += player.speed; break;
        case "d": offsetX -= player.speed; break;
    }
});

// Handle mouse dragging to shoot
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        dragEndX = e.clientX;
        dragEndY = e.clientY;
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (isDragging) {
        isDragging = false;
        const deltaX = dragStartX - dragEndX;
        const deltaY = dragStartY - dragEndY;
        projectiles.push({
            x: e.clientX - offsetX,
            y: e.clientY - offsetY,
            speedX: deltaX / 20,
            speedY: deltaY / 20,
            radius: 5,
        });
    }
});

// Update game objects
function update() {
    // Update circle positions
    circles.forEach(circle => {
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Wrap around the screen
        if (circle.x > 2000) circle.x = -2000;
        if (circle.x < -2000) circle.x = 2000;
        if (circle.y > 2000) circle.y = -2000;
        if (circle.y < -2000) circle.y = 2000;
    });

    // Update projectile positions
    projectiles.forEach((proj, index) => {
        proj.x += proj.speedX;
        proj.y += proj.speedY;

        // Remove projectile if out of bounds
        if (Math.abs(proj.x - player.x) > 3000 || Math.abs(proj.y - player.y) > 3000) {
            projectiles.splice(index, 1);
        }
    });
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render circles
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x + offsetX, circle.y + offsetY, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
        ctx.fill();
    });

    // Render projectiles
    projectiles.forEach(proj => {
        ctx.beginPath();
        ctx.arc(proj.x + offsetX, proj.y + offsetY, proj.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 50, 50, 1)";
        ctx.fill();
    });

    // Render dragging line
    if (isDragging) {
        ctx.beginPath();
        ctx.moveTo(dragStartX , dragStartY );
        ctx.lineTo(dragEndX, dragEndY);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(dragStartX , dragStartY , 5, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
    ctx.fill();
}

// Main game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

createCircles();
gameLoop();
