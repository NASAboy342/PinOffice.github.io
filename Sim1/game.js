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
    while (speed > 4.1){
        speed -= 4.1;
    }
    while (speed < 0){
        speed = 0.1;
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
        colorValue += getIntRandom(1,30);
    }
    else {
        colorValue -= getIntRandom(1,30);
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
    if(energys.length > 500){
        return;
    }
    let isSpernEnergys = getIntRandom(0, 10) > 5;
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

function createCell(px = 0, py = 0, pColorR = 0, pColorG = 0, pColorB = 0, pdirection = -1, pSpeed = 0, pEnergy = 0, pDna = []){
    cells.push(
        {
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
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[0] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[1] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[2] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[3] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[4] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[5] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[6] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[7] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[8] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[9] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[10] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[11] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[12] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[13] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[14] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[15] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[16] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[17] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[18] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[19] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[20] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[21] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[22] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[23] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[24] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[25] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[26] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[27] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[28] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[29] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[30] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[31] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[32] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[33] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[34] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[35] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[36] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[37] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[38] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[39] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[40] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[41] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[42] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[43] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[44] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[45] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[46] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[47] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[48] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[49] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[50] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[51] + getIntRandom(-0.5 , 0.5),
                pDna.length === 0 ? getIntRandom(-10, 10) : pDna[52] + getIntRandom(-0.5 , 0.5)
            ],
            lastDnaCheckInSec: 0,
            lastEnergyCheckInSec: 0,
            durationBetweenDnaCheckInSec: 5,
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
            checkToChangeDirection: function(objectDistent, objectAngle, objectColorR, objectColorG, objectColorB, isFood, objectSpeed) {
                if(objectDistent > 50){
                    return;
                }

                // console.log("objectDistent: " + objectDistent)
                // console.log("objectAngle: " + objectAngle)
                // console.log("objectColorR: " + objectColorR)
                // console.log("objectColorG: " + objectColorG)
                // console.log("objectColorB: " + objectColorB)
                // console.log("isFood: " + isFood)
                // console.log("objectSpeed: " + objectSpeed)

                let turningSpeeds = [
                    10 + objectDistent * this.dna[0] + checkAngle(objectAngle * this.dna[1]) + Math.abs((objectColorR - this.color.r) * this.dna[2]) + (Math.abs(objectColorG - this.color.g) * this.dna[3]) + (Math.abs(objectColorB - this.color.b) * this.dna[4])  + Number(isFood) * this.dna[5] + objectSpeed * this.dna[6],
                    20 + objectDistent * this.dna[7] + checkAngle(objectAngle * this.dna[8]) + Math.abs((objectColorR - this.color.r) * this.dna[9]) + (Math.abs(objectColorG - this.color.g) * this.dna[10]) + (Math.abs(objectColorB - this.color.b) * this.dna[11])  + Number(isFood) * this.dna[12] + objectSpeed * this.dna[13],
                    30 + objectDistent * this.dna[14] + checkAngle(objectAngle * this.dna[15]) + Math.abs((objectColorR - this.color.r) * this.dna[16]) + (Math.abs(objectColorG - this.color.g) * this.dna[17]) + (Math.abs(objectColorB - this.color.b) * this.dna[18])  + Number(isFood) * this.dna[19] + objectSpeed * this.dna[20],
                    40 + objectDistent * this.dna[21] + checkAngle(objectAngle * this.dna[22]) + Math.abs((objectColorR - this.color.r) * this.dna[23]) + (Math.abs(objectColorG - this.color.g) * this.dna[24]) + (Math.abs(objectColorB - this.color.b) * this.dna[25])  + Number(isFood) * this.dna[26] + objectSpeed * this.dna[27],
                    50 + objectDistent * this.dna[28] + checkAngle(objectAngle * this.dna[29]) + Math.abs((objectColorR - this.color.r) * this.dna[30]) + (Math.abs(objectColorG - this.color.g) * this.dna[31]) + (Math.abs(objectColorB - this.color.b) * this.dna[32])  + Number(isFood) * this.dna[33] + objectSpeed * this.dna[34],
                ]

                // console.log("dnas", this.dna)
                // console.log("turingSpeed", turningSpeeds)

                let turnDirection = [
                    turningSpeeds[0] * this.dna[35] + turningSpeeds[1] * this.dna[36] + turningSpeeds[2] * this.dna[37] + turningSpeeds[3] * this.dna[38] + turningSpeeds[4] * this.dna[39],
                    turningSpeeds[0] * this.dna[41] + turningSpeeds[1] * this.dna[42] + turningSpeeds[2] * this.dna[43] + turningSpeeds[3] * this.dna[44] + turningSpeeds[4] * this.dna[45],
                    turningSpeeds[0] * this.dna[47] + turningSpeeds[1] * this.dna[48] + turningSpeeds[2] * this.dna[49] + turningSpeeds[3] * this.dna[50] + turningSpeeds[4] * this.dna[51],
                ]

                // console.log("turnDirection", turnDirection)

                if(turnDirection[0] > turnDirection[1]){
                    this.turnRight(checkAngle(turnDirection[0]));
                }
                else {
                    this.turnLeft(checkAngle(turnDirection[1]));
                }

                this.speed = checkSpeed(turnDirection[2]);


                // if(Math.round(this.ageInSec - this.lastDirectionchangeAgeInSec) === this.changeDirectionIntervalInSeconds){
                //     this.lastDirectionchangeAgeInSec = this.ageInSec;
                //     this.changeRandomDirection();
                // }
                // else if(Math.round(this.ageInSec - this.lastDirectionchangeAgeInSec) > this.changeDirectionIntervalInSeconds){
                //     this.lastDirectionchangeAgeInSec = this.ageInSec;
                // }
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

                    if (distent === 0 && !angle){
                        return;
                    }

                    this.checkIfCanEat(cell, index);
                    this.checkForReproduce(cell, index);

                    this.checkToChangeDirection(distent, angle, cell.color.r, cell.color.g, cell.color.b, false, cell.speed);
                })
                energys.forEach((energy, index) => {
                    this.checkIfCanEatEnergy(energy, index);

                    let distent = getDistent(this.x, this.y, energy.x, energy.y);
                    let angle = getAngle(this.x, this.y, energy.x, energy.y);


                    if (!distent || !angle){
                        return;
                    }

                    this.checkToChangeDirection(distent, angle, energy.color.r, energy.color.g, energy.color.b, true, 0);
                })
            },
            checkDna: function(){
                if(this.ageInSec - this.lastDnaCheckInSec >= this.durationBetweenDnaCheckInSec ){
                    this.lastDnaCheckInSec = this.ageInSec;
                    if(this.lastEnergyCheckInSec >= this.energy){
                        this.dna.forEach(dna => {
                            dna = dna + getIntRandom(-0.5, 0.5);
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
            let bestCell = cells.sort((a,b) => b.energyHistory - a.energyHistory)[0];
            for(let i = 0; i < 200; i++) {
                if(dnas){
                    createCell(0, 0, bestCell.color.r, bestCell.color.g, bestCell.color.b, -1, bestCell.speed, 0, dnas);
                }
                else{
                    createCell(0, 0, bestCell.color.r, bestCell.color.g, bestCell.color.b, -1, bestCell.speed, bestCell.dna);
                }
            }
        }
    }
}

function checkRunTime(){
    runTimeInSec = (Date.now() - startTime) / 1000;

    if(runTimeInSec - lastCheckRunTime > durationBetweenRunTimeCheckInSec){
        lastCheckRunTime = runTimeInSec;
        let bestCell = cells.sort((a,b) => b.energyHistory - a.energyHistory)[0];
        if(bestCell){
            storedDnas(bestCell.dna, bestCell);
        }
    }
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
    
}

// Main game loop
async function gameLoop() {
    await update();
    render();
    requestAnimationFrame(gameLoop);
}
gameLoop();
