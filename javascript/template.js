const fs = require(`fs`)

const INPUT = 'ExpertPlusLawless.dat'
const OUTPUT = 'ExpertPlusStandard.dat'

const diff = JSON.parse(fs.readFileSync(INPUT))

diff.customData = { environent: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {}, pointDefinitions: {}, customEvents: [] }

const notes = diff.colorNotes;
const walls = diff.obstacles;
const bombs = diff.bombNotes;
const arcs = diff.sliders;
const chains = diff.burstSliders;
const lightEvents = diff.basicBeatmapEvents;
const environentArray = diff.customData.environment;
const fakeNotes = diff.customData.fakeColorNotes;
const fakeWalls = diff.customData.fakeObstacles;
const fakeBombs = diff.customData.fakeBombNotes;
const fakeChains = diff.customData.fakeBurstSliders;
const materials = diff.customData.materials;
const customEvents = diff.customData.customEvents;
const pointDefinitions = diff.customData.pointDefinitions;

notes.forEach(x => { if(!x.customData) { x.customData = {} }})
walls.forEach(x => { if(!x.customData) { x.customData = {} }})
bombs.forEach(x => { if(!x.customData) { x.customData = {} }})
arcs.forEach(x => { if(!x.customData) { x.customData = {} }})
chains.forEach(x => { if(!x.customData) { x.customData = {} }})


function notesBetween(time, timeEnd, forNote) {
    notes.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forNote(x)
        }
    });

    fakeNotes.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forNote(x)
        }
    })
}

function wallsBetween(time, timeEnd, forWall) {
    walls.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forWall(x)
        }
    });

    fakeWalls.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forWall(x)
        }
    })
}

function bombsBetween(time, timeEnd, forBomb) {
    bombs.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forBomb(x)
        }
    });

    fakeBombs.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forBomb(x)
        }
    })
}

function arcsBetween(time, timeEnd, forArc) {
    arcs.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forArc(x)
        }
    });
}

function chainsBetween(time, timeEnd, forChain = (x) => {}) {
    chains.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forChain(x)
        }
    });

    fakeChains.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forChain(x)
        }
    })
}

function r(num1, num2) {
    if(num1 > num2) { return Math.random() * (num1 - num2) + num2 } 
    else { return Math.random() * (num2 - num1) +  num1}
}


fs.writeFileSync(OUTPUT, JSON.stringify(diff, null, 0))