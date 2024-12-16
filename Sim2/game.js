const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const monitor1 = document.getElementById("monitor1");
const monitor2 = document.getElementById("monitor2");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let world = {
    x:1,
    y:1,
    width:canvas.width,
    height:canvas.height
}

let cells = [];
let energys = [];
let isPause = false;

let startTime = Date.now();
let runTimeInSec = 0;
let lastCheckRunTime = 0;
let durationBetweenRunTimeCheckInSec = 20;
let bestCellId = '';
let isDrawNeuronIllustration = true;


async function postData(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST', // Specifies a POST request
        headers: {
          'Content-Type': 'application/json' // Ensures data is sent as JSON
        },
        body: JSON.stringify(data) // Converts data to JSON string
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Assuming the API returns a JSON response
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      return null; // Or handle the error as needed
    }
}

function getIntRandom(min, max){
    return Math.random() * (max - min) + min;
}

function getDistent(object1x, object1y, object2x, object2y){
    let bottom = Math.abs(object1x - object2x);
    let height = Math.abs(object1y - object2y);
    return Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
}

function getAngle(object1x, object1y, object2x, object2y){
    const adjacent = object1x - object2x;
    const hypotenuse = getDistent(object1x, object1y, object2x, object2y);
    const thetaRadians = Math.acos(adjacent / hypotenuse);
    const thetaDegrees = Math.abs((thetaRadians * (180 / Math.PI)) - 360);
    return thetaDegrees;
}

function checkAngle(pAngle = 0){
    let angle = pAngle
    while (angle > 360){
        angle = angle - 360;
    }
    while (angle < 0){
        angle = angle + 360;
    }
    return angle;
}

function checkSpeed(speed){
    if(speed < 0){
        speed = Math.abs(speed);
    }
    while (speed > 4.1){
        speed -= 4.1;
    }
    return speed;
}

function moveX(degrees, speed){
    let radians = degrees * Math.PI / 180;
    return speed * Math.cos(radians);
}

function moveY(degrees, speed){
    let radians = degrees * Math.PI / 180;
    return speed * Math.sin(radians);
}

function turnRight(direction, turningSpeed){
    direction += turningSpeed;
    if (direction > 360){
        direction -= 360;
    }
    return direction;
}

function turnLeft(direction, turningSpeed){
    direction -= turningSpeed;
    if (direction < 0){
        direction += 360;
    }
    return direction;
}
function alterColor(colorValue) {
    let isAdd = getIntRandom(1,10) > 5;
    if (isAdd) {
        colorValue += getIntRandom(1,5);
    }
    else {
        colorValue -= getIntRandom(1,5);
    }

    if(colorValue >= 255){
        colorValue -= 255;
    }
    else if(colorValue <= 0){
        colorValue += 255;
    }
    return colorValue;
}

function checkToSpernEnergys() {
    if(energys.length > 10){
        return;
    }
    let isSpernEnergys = getIntRandom(0, 10) > 8;
    if(isSpernEnergys){
        energys.push({
            x: getIntRandom(1, world.width),
            y: getIntRandom(1, world.height),
            energy: 0.4,
            color: {
                r: pColorR = 255,
                g: pColorG = 255,
                b: pColorB = 0,
            },
        });
    }
}
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Define the character set
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function createCell(px = 0, py = 0, pColorR = 0, pColorG = 0, pColorB = 0, pdirection = -1, pSpeed = 0, pEnergy = 0, pDna = []){
    cells.push(
        {
            id: generateRandomString(10),
            x: px === 0 ? getIntRandom(1, world.width) : px,
            y: py === 0 ? getIntRandom(1, world.height) : py,
            defaultEnergy: 0.9,
            energy: pEnergy === 0 ? 0.9 : pEnergy,
            radius: function(){
                return this.energy;
            },
            maxEnergy: 7,
            direction: pdirection === -1 ? getIntRandom(1, 360) : pdirection,
            speed: pSpeed === 0 ? getIntRandom(1.1, 4.1) : Math.abs(pSpeed + getIntRandom(-0.5, 0.5)),
            turningSpeed: 50,
            color: {
                r: pColorR === 0 ? getIntRandom(0, 255) : alterColor(pColorR),
                g: pColorG === 0 ? getIntRandom(0, 255) : alterColor(pColorG),
                b: pColorB === 0 ? getIntRandom(0, 255) : alterColor(pColorB),
            },
            bornTime: Date.now(),
            ageInSec: 0,
            changeDirectionIntervalInSeconds: 1,
            lastDirectionchangeAgeInSec: 0,
            isFemale: getIntRandom(0,10) > 5,
            lastReproduceAgeInSec: 0,
            durationBetweenReproductionsInSec: 4,
            minDistanceThatCanReproduce: 20,
            minDistanceThatCanEat: 10,
            energyHistory: 0,
            totalReproductionsCount: 0,
            dna: [
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[0] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[1] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[2] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[3] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[4] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[5] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[6] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[7] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[8] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[9] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[10] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[11] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[12] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[13] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[14] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[15] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[16] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[17] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[18] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[19] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[20] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[21] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[22] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[23] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[24] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[25] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[26] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[27] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[28] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[29] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[30] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[31] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[32] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.707, 0.707) : pDna[33] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[34] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[35] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[36] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[37] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[38] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[39] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[40] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[41] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[42] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[43] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[44] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[45] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[46] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[47] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-0.866, 0.866) : pDna[48] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[49] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[50] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[51] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[52] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[53] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[54] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[55] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[56] + 0.02 * getIntRandom(-0.05 , 0.05),
                pDna.length === 0 ? getIntRandom(-1.0, 1.0) : pDna[57] + 0.02 * getIntRandom(-0.05 , 0.05),
            ],
            lastDnaCheckInSec: 0,
            lastEnergyCheckInSec: 0,
            durationBetweenDnaCheckInSec: 5,
            inPutNeurons: [],
            firstLayerNeurons: [],
            secondLayerNeurons: [],
            outPutNeurons: [],
            turnRight: function (turnSpeed) {
                this.direction = turnRight(this.direction, turnSpeed);
            },
            turnLeft: function (turnSpeed) {
                this.direction = turnLeft(this.direction, turnSpeed);
            },
            changeRandomDirection: function() {
                let isRight = Math.round(getIntRandom(0,10)) > 5;
                if(isRight){
                    this.turnRight();
                } else {
                    this.turnLeft();
                }
            },
            move: function() {
                this.x += moveX(this.direction, this.speed);
                this.y += moveY(this.direction, this.speed);
                this.energy -= this.speed / 10000;
            },
            calculateNeuronsReLU: function(inputs, dnaStartIndex, length) {
                let result = 0;

                for(let i = 1; i <= length; i++){
                    result += inputs[i-1] * this.dna[dnaStartIndex+(i-1)];
                }

                return Math.max(...[0, result]);
            },
            calculateNeuronsSigmoid: function(inputs, dnaStartIndex, length) {
                let result = 0;

                for(let i = 1; i <= length; i++){
                    result += inputs[i-1] * this.dna[dnaStartIndex+(i-1)];
                }

                return (1 / (1 + Math.exp(-result))).toFixed(8);
            },
            calculateNeuronsLinearActivation: function(inputs, dnaStartIndex, length) {
                let result = 0;
                for(let i = 1; i <= length; i++){
                    result += inputs[i-1] * this.dna[dnaStartIndex+(i-1)];
                }
                return result;
            },
            checkToChangeDirection: function(objectDistent = 0, objectAngle = 0, objectColorR = 0, objectColorG = 0, objectColorB = 0, isFood = false, objectSpeed = 0) {
                if(objectDistent > 50){
                    return;
                }

                let inPuts = [objectDistent, objectAngle, objectColorR - this.color.r, objectColorG - this.color.g, objectColorB - this.color.b, Number(isFood), objectSpeed]
                this.inPutNeurons = inPuts;

                let firstLayer = [
                    { id: 1, value: this.calculateNeuronsReLU(inPuts, 0, 7)},
                    { id: 2, value: this.calculateNeuronsReLU(inPuts, 7, 7)},
                    { id: 3, value: this.calculateNeuronsReLU(inPuts, 14, 7)},
                    { id: 4, value: this.calculateNeuronsReLU(inPuts, 20, 7)},
                    { id: 5, value: this.calculateNeuronsReLU(inPuts, 27, 7)},
                ]
                let firstLayerValues = firstLayer.map(l => l.value);
                this.firstLayerNeurons = firstLayer;

                let secondLayer = [
                    { id: 1, value: this.calculateNeuronsReLU(firstLayerValues, 34, 5)},
                    { id: 2, value: this.calculateNeuronsReLU(firstLayerValues, 39, 5)},
                    { id: 3, value: this.calculateNeuronsReLU(firstLayerValues, 44, 5)},
                ]
                let secondLayerValues = secondLayer.map(l => l.value);
                this.secondLayerNeurons = secondLayer;
                

                let outPutLayer = {
                    isRight: this.calculateNeuronsSigmoid(secondLayerValues, 49, 3) < 0.5,
                    angle: this.calculateNeuronsSigmoid(secondLayerValues, 52, 3) * (360 - 0) + 0,
                    speed: this.calculateNeuronsSigmoid(secondLayerValues, 55, 3) * (2.1 - 0.1) + 0.1
                }
                this.outPutNeurons = [ Number(outPutLayer.isRight), outPutLayer.angle , outPutLayer.speed]
                // if(this.id === bestCellId){
                //     console.log("angle:" , this.outPutNeurons);
                // }

                if(outPutLayer.isRight){
                    this.turnRight(checkAngle(outPutLayer.angle));
                }
                else {
                    this.turnLeft(checkAngle(outPutLayer.angle));
                }

                this.speed = checkSpeed(outPutLayer.speed);

            },
            handleWhenHitTheEdgeOfTheWorld: function() {
                if(this.x < 1){
                    this.x = world.width;
                } else if(this.x > world.width){
                    this.x = 1;
                }
                if(this.y < 1){
                    this.y = world.height;
                } else if(this.y > world.height){
                    this.y = 1;
                }
                
                if (this.x < 1 || this.x > world.width || this.y < 1 || this.y > world.height){
                    this.direction += Math.PI;
                    this.x = Math.max(Math.min(this.x, world.width), 1);
                    this.y = Math.max(Math.min(this.y, world.height), 1);
                }
            },
            reproduce: function(isBySex = false){
                createCell(this.x, this.y, this.color.r, this.color.g, this.color.b, -1, this.speed, (!isBySex ? this.energy/2 : 0), this.dna);
                if(!isBySex){
                    this.energy = this.energy / 2;
                }
                else{
                    this.energy -= this.defaultEnergy / 2 ;
                }
                this.lastReproduceAgeInSec = this.ageInSec;
                this.totalReproductionsCount += 1;
            },
            highestValueColor: function() {
                let rgb = [
                    {color: 'r', value: this.color.r},
                    {color: 'g', value: this.color.g},
                    {color: 'b', value: this.color.b}
                ]
                return rgb.sort((a, b) => b.value - a.value)[0].color;
            },
            checkForReproduce: function(cell, index) {
                if(cells.length > 800){
                    return;
                }
                let isCanReproduce = this.energy > this.defaultEnergy && (Math.round(this.ageInSec - this.lastReproduceAgeInSec) > this.durationBetweenReproductionsInSec)
                if(this.isFemale && isCanReproduce){
                    let bottom = Math.abs(this.x - cell.x);
                    let height = Math.abs(this.y - cell.y);
                    let hypotenuse = Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
                    let isTorching = (hypotenuse - this.radius() - cell.radius()) <= this.minDistanceThatCanReproduce;
                    if (isTorching){
                        let isMatchKindReproduce = this.highestValueColor() === cell.highestValueColor()
                        if (isMatchKindReproduce){
                            this.reproduce(true);
                        }
                    }
                }
                if(this.energy >= 1 && isCanReproduce){
                    this.reproduce();
                }
            },
            eat: function(cellIndex) {
                if(this.energy >= this.maxEnergy){
                    return;
                }
                let foodEnergyBeforce = cells[cellIndex].energy;
                if(foodEnergyBeforce <= 0.9){
                    cells[cellIndex].energy = 0.0;
                }
                else{
                    cells[cellIndex].energy -= 0.9;
                }
                let foodEnergyAfter = cells[cellIndex].energy;
                this.energy += foodEnergyBeforce - foodEnergyAfter;
                this.energyHistory += foodEnergyBeforce - foodEnergyAfter;
            },
            eatEnergy: function(energyIndex) {
                if(this.energy >= this.maxEnergy){
                    return;
                }
                let foodEnergyBeforce = energys[energyIndex].energy;
                if(foodEnergyBeforce <= 0.9){
                    energys[energyIndex].energy = 0.0;
                }
                else{
                    energys[energyIndex].energy -= 0.9;
                }
                let foodEnergyAfter = energys[energyIndex].energy;
                this.energy += foodEnergyBeforce - foodEnergyAfter;
                this.energyHistory += foodEnergyBeforce - foodEnergyAfter;
                if(energys[energyIndex].energy <= 0.0){
                    energys.splice(energyIndex, 1);
                }
            },
            isPray: function(cell){
                //let isRightKindToEat = (this.highestValueColor() === 'r' && cell.highestValueColor() === 'g') || (this.highestValueColor() === 'g' && cell.highestValueColor() === 'b') || (this.highestValueColor() === 'b' && cell.highestValueColor() === 'r');
                let isNotSameKindButSmaller = (this.highestValueColor() !== cell.highestValueColor()) && (this.energy > (cell.energy + cell.energy / 2));
                return isNotSameKindButSmaller
            },
            checkIfCanEat: function(cell, index) {
                let bottom = Math.abs(this.x - cell.x);
                let height = Math.abs(this.y - cell.y);
                let hypotenuse = Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
                let isTorching = (hypotenuse - this.radius() - cell.radius()) <= this.minDistanceThatCanEat;
                if (isTorching){
                    let isCanEat = this.isPray(cell);
                    if (isCanEat){
                        this.eat(index);
                    }
                }
            },
            checkIfCanEatEnergy: function(energy, index) {
                let bottom = Math.abs(this.x - energy.x);
                let height = Math.abs(this.y - energy.y);
                let hypotenuse = Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
                let isTorching = (hypotenuse - this.radius() - energy.energy) <= this.minDistanceThatCanEat;
                if (isTorching){
                    this.eatEnergy(index);
                }
            },
            basisEnergyConsumtion: function(){
                this.energy -= this.radius() / 3000;
            },
            lookAround: function(){

                cells.forEach((cell, index) =>{
                    let distent = getDistent(this.x, this.y, cell.x, cell.y);
                    let angle = getAngle(this.x, this.y, cell.x, cell.y);

                    if (distent !== 0 && angle){
                        this.checkIfCanEat(cell, index);
                        this.checkForReproduce(cell, index);

                        this.checkToChangeDirection(distent, angle, cell.color.r, cell.color.g, cell.color.b, false, cell.speed);
                    }
                })
                energys.forEach((energy, index) => {
                    this.checkIfCanEatEnergy(energy, index);

                    let distent = getDistent(this.x, this.y, energy.x, energy.y);
                    let angle = getAngle(this.x, this.y, energy.x, energy.y);


                    if (distent || angle){
                        this.checkToChangeDirection(distent, angle, energy.color.r, energy.color.g, energy.color.b, true, 0);
                    }

                })
            },
            checkDna: function(){
                if(this.ageInSec - this.lastDnaCheckInSec >= this.durationBetweenDnaCheckInSec ){
                    this.lastDnaCheckInSec = this.ageInSec;
                    if(this.lastEnergyCheckInSec >= this.energy){
                        this.dna.forEach(dna => {
                            dna = dna + 0.02 * getIntRandom(-0.05 , 0.05);
                        });
                    }
                    this.lastEnergyCheckInSec = this.energy
                }
            },
            progress: function() {
                this.ageInSec = (Date.now() - this.bornTime) / 1000;
                this.lookAround();
                this.move();
                this.basisEnergyConsumtion();
                this.handleWhenHitTheEdgeOfTheWorld();
                this.checkDna();
            }
        }
    );
}

function drawWorld() {
    ctx.strokeStyle = 'red'; 
    ctx.lineWidth = 3; 
    ctx.strokeRect(world.x, world.y, world.width, world.height);
}

function drawCells() {
    cells.forEach(cell => {
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, cell.radius()+1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cell.color.r}, ${cell.color.g}, ${cell.color.b}, ${cell.isFemale? 0.5 : 0.8})`;
        ctx.fill();

        if(cell.id === bestCellId){
            ctx.beginPath();
            ctx.arc(cell.x, cell.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
            ctx.fill();
        }
    });
    
}

function drawEnergy() {
    energys.forEach(energy => {
        ctx.beginPath();
        ctx.arc(energy.x, energy.y, energy.energy+1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${energy.color.r}, ${energy.color.g}, ${energy.color.b}, 1)`;
        ctx.fill();
    });
}

async function getStoredDnas(){
    let url = "http://pnut.local.com:400/Sim1/get-dna";
    let request = {
        generation: 0,
        isGetAll: true,
    }
    let storedDna = await postData(url, request);
    if(storedDna.dnas){
        let dnas = storedDna.dnas.map(d => d.value);
        return dnas;
    }
    isPause = true;
    alert("Failed to load simulation data, please try again.");
    return [];
}

async function storedDnas(dnas = [] , cell){
    let url = "http://pnut.local.com:400/Sim1/save-dna";
    let request = { 
        dnas: [],
        energyRecord: cell.energyHistory, 
        ageInSec: Math.round(cell.ageInSec),
        finalEnergy: cell.energy,
        reproductionCount: cell.totalReproductionsCount,
        isFemale: cell.isFemale,
        colorRGB: JSON.stringify( cell.color)
    }

    dnas.forEach(dna => {
        request.dnas.push({
            value: dna
        })
    })

    let response = await postData(url, request);
    if(!response || response.errorCode !== 0){
        isPause = true;
        alert("Failed to save simulation data, please try again.");
    }
}

async function populationControl(){
    let isOverPopulated = cells.length > 1000;
    if(!isOverPopulated){
        cells.forEach((cell,index) => {
            cell.progress();
    
            if (!cell.energy || cell.energy <= 0.2){
                cells.splice(index, 1);
            }
        });
    }
    if(isOverPopulated){
        for(let i = 0; i < 500; i++){
            let randomIndex = getIntRandom(0, cells.length - 1);
            cells.splice(randomIndex, 1);
        }
    }

    if(cells.length < 50) {
        let dnas = await getStoredDnas();
        //let dnas = [];
        if(cells.length < 1){
            for(let i = 0; i < 200; i++) {
                if(dnas || dnas.length != 0){
                    createCell(0, 0, 0, 0, 0, -1, 0, 0, dnas);
                }
                else{
                    createCell();
                }
            }
        }
        else{
            let bestCell = cells.sort((a,b) => b.totalReproductionsCount - a.totalReproductionsCount)[0];
            for(let i = 0; i < 200; i++) {
                if(dnas){
                    createCell(0, 0, 0, 0, 0, -1, 0, 0, dnas);
                }
                else{
                    createCell(0, 0, bestCell.color.r, bestCell.color.g, bestCell.color.b, -1, bestCell.speed, 0, bestCell.dna);
                }
            }
        }
    }
}

function restartSim(){
    location.reload();
}

function checkRunTime(){
    runTimeInSec = (Date.now() - startTime) / 1000;

    if(runTimeInSec - lastCheckRunTime > durationBetweenRunTimeCheckInSec){
        lastCheckRunTime = runTimeInSec;
        let bestCell = cells.sort((a,b) => b.totalReproductionsCount - a.totalReproductionsCount)[0];
        if(bestCell){
            bestCellId = bestCell.id;
            storedDnas(bestCell.dna, bestCell);
        }
    }
}

function drawNeuron(x, y, outPut = 0){
    let radias =  ((1 / (1 + Math.exp(-outPut))).toFixed(8)) * (20 - 1) + 1
    ctx.beginPath();
    ctx.arc(x, y, radias, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();

    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(`${outPut}`, x, y);
}
function drawOutPutNeuron(x, y, outPut = 0){
    ctx.beginPath();
    let hHight = 10;
    let width = 80;
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.fillRect(x, y-hHight, width, hHight*2);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'blue';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(`${outPut}`, x+2, y);
}

function drawWeight(sx, sy, tx, ty, value = 0){
    let opacity = ((1 / (1 + Math.exp(-value))).toFixed(8))
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(tx, ty);
    ctx.strokeStyle = `rgba(255,0,0,${opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawBestCellNeurons(cell){
    let inputLayer = [
        {
            id: 1,
            x: 100,
            y: 100,
        },
        {
            id: 2,
            x: 100,
            y: 200,
        },
        {
            id: 3,
            x: 100,
            y: 300,
        },
        {
            id: 4,
            x: 100,
            y: 400,
        },
        {
            id: 5,
            x: 100,
            y: 500,
        },
        {
            id: 6,
            x: 100,
            y: 600,
        },
        {
            id: 7,
            x: 100,
            y: 700,
        }
    ]

    let firstLayer = [
        {
            id: 1,
            x: 250,
            y: 100,
        },
        {
            id: 2,
            x: 250,
            y: 200,
        },
        {
            id: 3,
            x: 250,
            y: 300,
        },
        {
            id: 4,
            x: 250,
            y: 400,
        },
        {
            id: 5,
            x: 250,
            y: 500,
        }
    ]

    let secondLayer = [
        {
            id: 1,
            x: 400,
            y: 100,
        },
        {
            id: 2,
            x: 400,
            y: 200,
        },
        {
            id: 3,
            x: 400,
            y: 300,
        }
    ]

    let outPutLayer = [
        {
            id: 1,
            x: 550,
            y: 100,
        },
        {
            id: 2,
            x: 550,
            y: 200,
        },
        {
            id: 3,
            x: 550,
            y: 300,
        }
    ]

    inputLayer.forEach((i, index) => {
        let nValue = 0
        if(cell){
            nValue = cell.inPutNeurons[index];
        }
        firstLayer.forEach(t => {
            drawWeight(i.x, i.y, t.x, t.y, nValue.toFixed(3));
        })
        drawNeuron(i.x, i.y, nValue.toFixed(3));
    })
    firstLayer.forEach((i,index) => {
        let nValue = 0
        if(cell){
            nValue = cell.firstLayerNeurons[index].value;
        }
        secondLayer.forEach(t => {
            drawWeight(i.x, i.y, t.x, t.y, nValue.toFixed(3));
        })
        drawNeuron(i.x, i.y,nValue.toFixed(3));
    })
    secondLayer.forEach((i, index) => {
        let nValue = 0
        if(cell){
            nValue = cell.secondLayerNeurons[index].value;
        }
        outPutLayer.forEach(t => {
            drawWeight(i.x, i.y, t.x, t.y, nValue.toFixed(3));
        })
        drawNeuron(i.x, i.y, nValue.toFixed(3));
    })
    outPutLayer.forEach((i,index) => {
        let nValue = 0;
        
        if(cell){
            nValue = cell.outPutNeurons[index];
        }
        drawOutPutNeuron(i.x, i.y, nValue.toFixed(3));
    })
}

function drawNeuronIllustration(){
    if(!isDrawNeuronIllustration){
        return;
    }
    ctx.strokeStyle = 'gray'; 
    ctx.lineWidth = 3; 
    ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
    ctx.fill();
    ctx.strokeRect(world.x, world.y, world.width/3, world.height);
    ctx.fillRect(world.x, world.y, world.width/3, world.height);

    let bestCell = cells.find(cell => cell.id === bestCellId);
    drawBestCellNeurons(bestCell);
}

document.addEventListener("keydown", (e) => {
    if(e.key === " "){
        for(let i = 0; i < 200; i++) { 
            createCell();
        }
    }
    if(e.key === "p"){
        isPause =!isPause;
    }
    if(e.key === "i"){
        isDrawNeuronIllustration = !isDrawNeuronIllustration
    }
});


// Update game objects
async function update() {
    if(isPause){
        return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    world.height = canvas.height;
    world.width = canvas.width;
    
    checkToSpernEnergys();
    await populationControl();
    checkRunTime();
    monitor1.textContent = `${cells.length}`;
}

// Render game objects
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld();
    drawEnergy();
    drawCells();
    drawNeuronIllustration();
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
