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
    isEDown: false
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
        };
        socket.send(JSON.stringify(req));
    },
    Move(){
        if(key.isWDown){
            player.position.y -= 1;
            this.synce()
        }
        if(key.isADown){
            player.position.x -= 1;
            this.synce()
        }
        if(key.isSDown){
            player.position.y += 1;
            this.synce()
        }
        if(key.isDDown){
            player.position.x += 1;
            this.synce()
        }
    }
}
let serverConnected = false;
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

    monitor1.textContent = JSON.stringify(`${bottomPow2} , ${heightPow2}, ${bottom}, ${height}, ${hypotenuse}`);

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
    monitor2.textContent = thetaDegrees;
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
    ctx.beginPath();
    ctx.translate(player.getRelativeX(player.position.x), player.getRelativeY(player.position.y));
    ctx.rotate((player.facingDirection * Math.PI) / 180);
    ctx.drawImage(playerImg, -50, -50, 100, 100);
    
    // ctx.strokeStyle = 'gray'; 
    // ctx.lineWidth = 3; 
    // ctx.strokeRect( -49, -49, playerImg.width, playerImg.height);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

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
});

document.addEventListener("mousemove", (mouse) => {
    player.facingDirection = getAngle2(mouse.clientX, mouse.clientY, player.view.weight/2, player.view.height/2);
});

login();

// Update game objects
async function update() {
    player.Move();
    //player.facingDirection += 1;
    if(serverMessage){
        
    }
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(serverConnected){
        drawWorld();
        drawBalls();
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
