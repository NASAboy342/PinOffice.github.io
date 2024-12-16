const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const monitor1 = document.getElementById("monitor1");
// const monitor2 = document.getElementById("monitor2");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let world = {
    x:1,
    y:1,
    width:canvas.width,
    height:canvas.height
}

let walls = [];

let bird = {
    x: world.width / 3,
    y: world.height / 2,
    radius: 20,
    color: {
        r: 255,
        g: 255,
        b: 0
    },
    speed: 0,
    upSpeed: 10,
    upTopSpeed: 10,
    bornTime: Date.now(),
    ageInSec: 0,
    isFlopping: false,
    aging: function(){
        this.ageInSec = Date.now - this.bornTime / 1000;
    },
    gravityExcelerate: function(){
        this.speed += 0.3;
    },
    fall: function(){
        if(this.isFlopping){
            return;
        }
        this.gravityExcelerate();
        this.y += this.speed;
    },
    flopWin: function(){
        if(this.y < 0){
            return;
        }
        this.isFlopping = true;
        this.upSpeed = 10;
        this.speed = 0;
    },
    checkToFloppWing: function(){
        if(!this.isFlopping){
            return;
        }
        this.y -= this.upSpeed;
        this.upSpeed -= 0.4
        if(this.upSpeed < 0){
            this.isFlopping = false;
            this.upSpeed = 10;
        }
    },
    progress: function(){
        this.aging();
        this.fall();
        this.checkToFloppWing()

        if(this.y > world.height){
            this.y = world.height / 2;
            this.speed = 0;
        }
        monitor1.textContent = this.isFlopping;
    }
}

function spawnWall(){
    walls.push({
        x: world.width,
        y: world.height,
        width: -50,
        height: -300,
        move: function(){
            this.x -= 3;
            if(this.x < -this.width){
                this.x = world.width;
            }
        }
    })
}

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${bird.color.r}, ${bird.color.g}, ${bird.color.b}, 0.8)`;
    ctx.fill();
}

function drawWorld() {
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = 3; 
    ctx.strokeRect(world.x, world.y, world.width, world.height);
}

function drawWalls(){
    walls.forEach(wall => {
        ctx.strokeStyle = 'red'; 
        ctx.lineWidth = 3; 
        ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
    });
    
}

document.addEventListener("keydown", (e) => {
    if(e.key === " "){
        bird.flopWin();
    }
    if(e.key === "s"){
        spawnWall();
    }
});

// Update game objects
async function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.height = canvas.height;
    world.width = canvas.width;

    bird.progress()
    walls.forEach(wall => {
        wall.move();
    });
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld();
    drawWalls();
    drawBird();
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
