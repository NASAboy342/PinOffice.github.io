const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
 const monitor1 = document.getElementById("monitor1");
 const monitor2 = document.getElementById("monitor2");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let key = {
    isWDown: false,
    isADown: false,
    isSDown: false,
    isDDown: false,
    isQDown: false,
    isEDown: false,
    isSpaceDown: false,
}
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    
    return result;
}
let serverConnected = false;
const socket = new WebSocket('wss://localhost:7090/synce-game');
let player = {
    name: generateRandomString(10),
    view: {
        weight: canvas.width,
        height: canvas.height
    },
    position: {
        x: 0,
        y: 0
    },
    radius: 20,
    facingDirection: 0,
    spawnTime: Date.now(), 
    ageInSec: 0,
    shootIntervalInSec: 1, 
    lastShootTimeInSec: 0,
    isShooting: false,
    getRelativeX(objectX){
        return (objectX - this.position.x + this.view.weight/2);
    },
    getRelativeY(objectY){
        return (objectY - this.position.y + this.view.height/2);
    },
    synce(){
        let req = {
            Name: this.name,
            View: this.view,
            Position: this.position,
            FacingDirection: this.facingDirection,
            IsShooting: this.isShooting
        };
        socket.send(JSON.stringify(req));
    },
    Move(){
        if(key.isWDown){
            player.position.y -= 1;
        }
        if(key.isADown){
            player.position.x -= 1;
        }
        if(key.isSDown){
            player.position.y += 1;
        }
        if(key.isDDown){
            player.position.x += 1;
        }
        if(serverConnected){
            this.synce()
        }
    },
    shoot(){
            this.isShooting = key.isSpaceDown;
    },
    aging(){
        this.ageInSec = (Date.now() - this.spawnTime) / 1000;
    }
}

let serverMessage = {};

const playerImg = new Image();
playerImg.src = 'assets/s5dc6c8ipqix (1).png';

function getDistent(object1x, object1y, object2x, object2y){
    let bottom = Math.abs(object1x - object2x);
    let height = Math.abs(object1y - object2y);
    return Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
}
function getHypotenuse(object1x, object1y, object2x, object2y){
    let bottom = object1x - object2x;
    let height = object1y - object2y;
    let bottomPow2 = Math.pow(bottom,2);
    let heightPow2 = Math.pow(height,2);

    let hypotenuse = Math.sqrt(bottomPow2 + heightPow2) * ((bottom < 0 ? -1 : 1) * (height < 0 ? -1 : 1));

    return hypotenuse
}

function checkAngle(angle){
    return angle % 360;
}

function getAngle2(object1x, object1y, object2x, object2y) {
    const deltaX = object2x - object1x;
    const deltaY = object2y - object1y;

    const thetaRadians = Math.atan2(deltaY, deltaX);

    const thetaDegrees = checkAngle(((thetaRadians * (180 / Math.PI) + 360) % 360) + 180);
    return thetaDegrees;
}
async function postApi(url, data, headers = {}) {
    try {
        const response = await fetch(`https://localhost:7090/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Parses JSON response into native JavaScript objects
    } catch (error) {
        console.error('Error making POST request:', error);
        throw error; // Re-throw to handle it in the calling code
    }
}

async function login(){
    const url = 'add-player';
    let req = {
        Name: player.name,
        View: player.view,
        Position: player.position,
    };
    await postApi(url, req);
}



// Event listener for connection open
socket.addEventListener('open', () => {
    console.log('Connected to WebSocket server');
    // Send a message to the server
    let req = {
        Name: player.name,
        View: player.view,
        Position: player.position,
    };
    socket.send(JSON.stringify(req));
});

// Event listener for messages from the server
socket.addEventListener('message', (event) => {
    if(event.data){
        serverMessage = JSON.parse(event.data);
        serverConnected = true;
    }
});

// Event listener for errors
socket.addEventListener('error', (error) => {
    serverMessage = error;
});

// Event listener for when the connection is closed
socket.addEventListener('close', () => {
    serverMessage = null;
});

function drawWorld() {
    ctx.strokeStyle = 'gray'; 
    ctx.lineWidth = 3; 
    ctx.strokeRect( player.getRelativeX(1), player.getRelativeY(1), serverMessage.World.Weight, serverMessage.World.Height);
}

function drawBalls() {
    serverMessage.Balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(player.getRelativeX(ball.Position.X), player.getRelativeY(ball.Position.Y), 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,0,1)';
        ctx.fill();
    });
}

function drawPlayer(){
    if(!serverMessage){
        
    }
    if(!serverMessage.Players){
        return;
    }
    let playerInfoFromServer = serverMessage.Players.find(p => p.Name === player.name)
    let playerRadius = 100;
    ctx.beginPath();
    ctx.translate(player.getRelativeX(playerInfoFromServer.Position.X), player.getRelativeY(playerInfoFromServer.Position.Y));
    ctx.rotate((playerInfoFromServer.FacingDirection * Math.PI) / 180);
    ctx.drawImage(playerImg, -playerRadius, -playerRadius, playerRadius*2, playerRadius*2);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

}

function drawEnemyPlayer(){
    if(!serverMessage){
        
    }
    if(!serverMessage.Players){
        return;
    }
    let playerInfoFromServer = serverMessage.Players.filter(p => p.Name !== player.name)
    playerInfoFromServer.forEach(p => {
        let playerRadius = 100;
        ctx.beginPath();
        ctx.translate(player.getRelativeX(p.Position.X), player.getRelativeY(p.Position.Y));
        ctx.rotate((p.FacingDirection * Math.PI) / 180);
        ctx.drawImage(playerImg, -playerRadius, -playerRadius, playerRadius*2, playerRadius*2);
        
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
    

}

function drawBullets(){
    serverMessage.Bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(player.getRelativeX(bullet.Position.X), player.getRelativeY(bullet.Position.Y), bullet.Radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(0, 178, 225)';
        ctx.fill();
    });
}

document.addEventListener("keydown", (e) => {
    if(e.key === "w"){
        key.isWDown = true;
    }
    if(e.key === "s"){
        key.isSDown = true;
    }
    if(e.key === "a"){
        key.isADown = true;
    }
    if(e.key === "d"){
        key.isDDown = true;
    }
    if(e.key === " "){
        key.isSpaceDown = true;
        player.shoot();
    }
});

document.addEventListener("keyup", (e) => {
    if(e.key === "w"){
        key.isWDown = false;
    }
    if(e.key === "s"){
        key.isSDown = false;
    }
    if(e.key === "a"){
        key.isADown = false;
    }
    if(e.key === "d"){
        key.isDDown = false;
    }
    if(e.key === " "){
        key.isSpaceDown = false;
        player.shoot();
    }
});

document.addEventListener("mousemove", (mouse) => {
    player.facingDirection = getAngle2(mouse.clientX, mouse.clientY, player.view.weight/2, player.view.height/2);
});

login();

// Update game objects
async function update() {
    player.Move();
    // if(serverMessage){
    //     monitor1.textContent = JSON.stringify(serverMessage);
    // }
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(serverConnected){
        drawWorld();
        drawBalls();
        drawBullets();
        drawEnemyPlayer();
        drawPlayer();
    }
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
