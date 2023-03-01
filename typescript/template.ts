/*
 * ////////////////////////////////////////////////////////////////////////////////////////////////
 * this script depends on Deno, find a description here: https://deno.land
 * you can install it by going to extensions, and searching for `deno`
 * then press ctrl+shift+p and selecting deno: initialize workspace configuration and saying yes to everything
 * ///////////////////////////////////////////////////////////////////////////////////////////////
 */

const INPUT = 'ExpertPlusLawles.dat'
const OUTPUT = 'ExpertPlusStandard.dat'

const diff = JSON.parse(Deno.readTextFileSync(INPUT))

diff.customData = { environent: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {} }

const notes = diff.colorNotes;
const walls = diff.obstacles;
const bombs = diff.bombNotes;
const arcs = diff.sliders;
const chains = diff.burstSliders;
const lightEvents = diff.basicBeatmapEvents;
const environent = diff.customData.environment;
const fakeNotes = diff.customData.fakeColorNotes;
const fakeWalls = diff.customData.fakeObstacles;
const fakeBombs = diff.customData.fakeBombNotes;
const fakeChains = diff.customData.fakeBurstSliders;
const materials = diff.customData.materials;


type noteType = {
    b?: number,
    x?: number,
    y?: number,
    c?: number,
    d?: number,
    a?: number,
    customData?: {}
}

type wallType = {
    b?: number,
    x?: number,
    y?: number,
    d?: number,
    w?: number,
    h?: number,
    customData?: {}
}

type bombType = {
    b?: number,
    x?: number,
    y?: number,
    customData?: {}
}

type arcType = {
    b?: number,
    c?: number,
    x?: number,
    y?: number,
    d?: number,
    mu?: number,
    tb?: number,
    tx?: number,
    ty?: number,
    tc?: number,
    tmu?: number,
    m?: number,
    customData: {}
}

type chainType = {
    b?: number,
    x?: number,
    y?: number,
    c?: number,
    d?: number,
    tb?: number,
    tx?: number,
    ty?: number,
    sc?: number,
    s?: number
}


function notesBetween(time: number, timeEnd: number, forNote: (x: noteType) => void) {
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

function wallsBetween(time: number, timeEnd: number, forWall: (x: wallType) => void) {
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

function bombsBetween(time: number, timeEnd: number, forBomb: (x: bombType) => void) {
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

function arcsBetween(time: number, timeEnd: number, forArc: (x: arcType) => void) {
    arcs.forEach(x => {
        if(x.b >= time && x.b <= timeEnd) {
            forArc(x)
        }
    });
}

function chainsBetween(time: number, timeEnd: number, forChain: (x: chainType) => void) {
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



Deno.writeTextFileSync(OUTPUT, JSON.stringify(diff, null, 0))