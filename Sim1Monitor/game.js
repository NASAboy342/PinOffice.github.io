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

let inPutNeurons = [];

let neurons = [];

let outPutNeurons = [];

let turningNeurons = {
    name: "Turning(isLeft, isRight, angularSpeed)",
    x: 1300,
    y: 120
}


function createInputNeurons(name, x, y){
    inPutNeurons.push({
        name: name,
        x: x,
        y: y
    })
}

function createNeurons(name, x, y){
    neurons.push({
        name: name,
        x: x,
        y: y
    })
}

function createOutPutNeurons(name, x, y){
    outPutNeurons.push({
        name: name,
        x: x,
        y: y
    })
}

function getNeurons(){
    let inPutNeuronNames = [
        "objectDistent", 
        "objectAngle", 
        "objectColorR", 
        "objectColorG", 
        "objectColorB", 
        "isFood", 
        "objectSpeed"
    ]
    inPutNeuronNames.forEach((n, index) => {
        createInputNeurons(n, 100, (index + 1) * 120);
    })

    let neuronNames = [
        "Sum(Input)",
        "Sum(Input)",
        "Sum(Input)",
        "Sum(Input)",
        "Sum(Input)"
    ]
    neuronNames.forEach((n, index) => {
        createNeurons(n, 500, (index + 1) * 120);
    })

    let outNeuronNames = [
        "Sum(Input)",
        "Sum(Input)",
        "Sum(Input)"
    ]
    outNeuronNames.forEach((n, index) => {
        createNeurons(n, 900, (index + 1) * 120);
    })
}

function drawInputNeurons(){
    inPutNeurons.forEach(neuron => {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 20, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.font = '20px Arial'; 
        ctx.fillStyle = 'blue';  
        ctx.fillText(neuron.name, neuron.x -30, neuron.y -30); // Text, x, y
    });
}

function drawNeurons(){
    neurons.forEach(neuron => {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 20, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.font = '20px Arial'; 
        ctx.fillStyle = 'blue';  
        ctx.fillText(neuron.name, neuron.x -30, neuron.y -30); // Text, x, y
    });
}

function drawOutPutNeurons(){
    outPutNeurons.forEach(neurons => {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, 20, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        ctx.font = '20px Arial'; 
        ctx.fillStyle = 'blue';  
        ctx.fillText(neuron.name, neuron.x -30, neuron.y -30); // Text, x, y
    });
}

function drawTurningNeuron(){
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(turningNeurons.x, turningNeurons.y, 20, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    ctx.font = '20px Arial'; 
    ctx.fillStyle = 'blue';  
    ctx.fillText(turningNeurons.name, turningNeurons.x -30, turningNeurons.y -30); // Text, x, y
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
    drawInputNeurons();
    drawNeurons();
    drawTurningNeuron();
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
getNeurons();
gameLoop();
