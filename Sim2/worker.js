// worker.js
let cells = [];
let world = { x: 1, y: 1, width: 0, height: 0 };
let isPause = false;

// Worker functions for random values, movement, direction changes, color alteration, and creating cells...
// (Copy necessary functions here: `getIntRandom`, `moveX`, `moveY`, `turnRight`, `turnLeft`, etc.)

self.onmessage = function(e) {
    const { type, payload } = e.data;

    if (type === 'initialize') {
        world = payload.world;
        for (let i = 0; i < 900; i++) {
            createCell(); // Create initial cells
        }
    } else if (type === 'update') {
        if (!isPause) {
            let isOverPopulated = cells.length > 1000;
            if (!isOverPopulated) {
                cells.forEach((cell, index) => {
                    cell.progress();
                    if (cell.energy <= 0.2) cells.splice(index, 1); // Remove cells with low energy
                });
            } else {
                // Remove excess cells
                for (let i = 0; i < 500; i++) {
                    let randomIndex = getIntRandom(0, cells.length - 1);
                    cells.splice(randomIndex, 1);
                }
            }
        }
        let copiedCells = JSON.parse(JSON.stringify(cells));
        self.postMessage({ type: 'updateComplete', copiedCells}); // Send updated cells back to the main thread
    } else if (type === 'togglePause') {
        isPause = !isPause;
    }
};


// Copy the `createCell`, `progress`, and other helper functions here...

function getIntRandom(min, max){
    return Math.floor(Math.random() * max) + min;
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



function createCell(px = 0, py = 0, pColorR = 0, pColorG = 0, pColorB = 0, pdirection = -1, pSpeed = 0, pEnergy = 0){
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
            turnRight: function () {
                this.direction = turnRight(this.direction, getIntRandom(1,this.turningSpeed));
            },
            turnLeft: function () {
                this.direction = turnLeft(this.direction, getIntRandom(1,this.turningSpeed));
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
            checkToChangeDirection: function() {
                if(Math.round(this.ageInSec - this.lastDirectionchangeAgeInSec) === this.changeDirectionIntervalInSeconds){
                    this.lastDirectionchangeAgeInSec = this.ageInSec;
                    this.changeRandomDirection();
                }
                else if(Math.round(this.ageInSec - this.lastDirectionchangeAgeInSec) > this.changeDirectionIntervalInSeconds){
                    this.lastDirectionchangeAgeInSec = this.ageInSec;
                }
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
                createCell(this.x, this.y, this.color.r, this.color.g, this.color.b, -1, this.speed, (!isBySex ? this.energy/2 : 0));
                if(!isBySex){
                    this.energy = this.energy / 2;
                }
                this.lastReproduceAgeInSec = this.ageInSec;
            },
            highestValueColor: function() {
                let rgb = [
                    {color: 'r', value: this.color.r},
                    {color: 'g', value: this.color.g},
                    {color: 'b', value: this.color.b}
                ]
                return rgb.sort((a, b) => b.value - a.value)[0].color;
            },
            checkForReproduce: function() {
                cells.length > 1000;
                let isCanReproduce = this.ageInSec > 10 && (Math.round(this.ageInSec - this.lastReproduceAgeInSec) > this.durationBetweenReproductionsInSec)
                if(this.isFemale && isCanReproduce){
                    cells.filter(cell => !cell.isFemale).forEach(cell => {
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
                    })
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
            },
            checkIfCanEat: function() {
                cells.forEach((cell, index) => {
                    let bottom = Math.abs(this.x - cell.x);
                    let height = Math.abs(this.y - cell.y);
                    let hypotenuse = Math.sqrt(Math.pow(bottom,2) + Math.pow(height,2))
                    let isTorching = (hypotenuse - this.radius() - cell.radius()) <= this.minDistanceThatCanEat;
                    if (isTorching){
                        let isCanEat = (this.highestValueColor() === 'r' && cell.highestValueColor() === 'g') || (this.highestValueColor() === 'g' && cell.highestValueColor() === 'b') || (this.highestValueColor() === 'b' && cell.highestValueColor() === 'r')
                        if (isCanEat){
                            this.eat(index);
                        }
                    }
                })
            },
            basisEnergyConsumtion: function(){
                this.energy -= this.radius() / 3000;
            },
            progress: function() {
                this.ageInSec = (Date.now() - this.bornTime) / 1000;
                this.checkToChangeDirection();
                this.move();
                this.handleWhenHitTheEdgeOfTheWorld();
                this.checkIfCanEat();
                this.checkForReproduce();
                this.basisEnergyConsumtion();
            }
        }
    );
}