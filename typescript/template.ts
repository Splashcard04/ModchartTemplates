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

diff.customData = { environent: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {}, pointDefinitions: {}, customEvents: [] }

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
const customEvents = diff.customData.customEvents;
const pointDefinitions = diff.customData.pointDefinitions;

type EaseBase<T extends string> = `easeIn${T}` | `easeOut${T}` | `easeInOut${T}`;

type Ease =
    "easeLinear" |
    "easeStep" |
    EaseBase<"Quad"> |
    EaseBase<"Cubic"> |
    EaseBase<"Quart"> |
    EaseBase<"Quint"> |
    EaseBase<"Sine"> |
    EaseBase<"Expo"> |
    EaseBase<"Circ"> |
    EaseBase<"Elastic"> |
    EaseBase<"Back"> |
    EaseBase<"Bounce">

type Spline = "splineCatmullRom"


type Vec3Anim = [number, number, number, number, Ease?, Spline?][]
type Vec1Anim = [number, number, Ease?, Spline?][]
type vec5Anim = [number, number, number, number, number, Ease?, Spline?][]

type customDataType = {
    coordinates?: [],
    worldRotation?: [],
    size?: [],
    uninteractable?: [],
    localRotation?: [],
    noteJumpMovementSpeed?: number,
    noteJumtStartBeatOffset?: number,
    color?: [],
    spawnEffect?: boolean,
    flip?: boolean,
    disableNoteGravity?: boolean,
    disableNoteLook?: boolean,
    lightID?: number,
    lightType?: number,
    easing?: string,
    lockRotation?: boolean,
    speed?: number,
    rotation?: number,
    nameFilter?: number,
    step?: number,
    prop?: number,
    direction?: number,
    track?: string,
    animation?: {
        color?: vec5Anim,
        dissolve?: Vec1Anim,
        position?: Vec3Anim,
        definitePosition?: Vec3Anim,
        size?: Vec3Anim,
        scale?: Vec3Anim,
        offsetPosition?: Vec3Anim,
        localRotation?: Vec3Anim,
        dissolveArrow?: Vec1Anim
    }
}


type noteType = {
    b?: number,
    x?: number,
    y?: number,
    c?: number,
    d?: number,
    a?: number,
    customData?: customDataType
}

type notePushType = {
    b: number,
    x: number,
    y: number,
    c: number,
    d: number,
    a: number,
    customData?: customDataType
}

type wallType = {
    b?: number,
    x?: number,
    y?: number,
    d?: number,
    w?: number,
    h?: number,
    customData?: customDataType
}

type wallPushType = {
    b: number,
    x: number,
    y: number,
    d: number,
    w: number,
    h: number,
    customData?: customDataType
}

type bombType = {
    b?: number,
    x?: number,
    y?: number,
    customData?: customDataType
}

type bombPushType = {
    b: number,
    x: number,
    y: number,
    customData?: customDataType
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
    customData?: customDataType
}

type arcPushType = {
    b: number,
    c: number,
    x: number,
    y: number,
    d: number,
    mu: number,
    tb: number,
    tx: number,
    ty: number,
    tc: number,
    tmu: number,
    m: number,
    customData?: customDataType
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
    s?: number,
    customData?: customDataType
}

type chainPushType = {
    b: number,
    x: number,
    y: number,
    c: number,
    d: number,
    tb: number,
    tx: number,
    ty: number,
    sc: number,
    s: number,
    customData?: customDataType
}

type customEventType =
    "AnimateTrack" | "AssignTrackParent" | "AssignPathAnimation"

type customEventPushType = {
    b: number,
    t: customEventType,
    d: {
        duration: number,
        color?: vec5Anim,
        dissolve?: Vec1Anim,
        position?: Vec3Anim,
        definitePosition?: Vec3Anim,
        size?: Vec3Anim,
        scale?: Vec3Anim,
        offsetPosition?: Vec3Anim,
        localRotation?: Vec3Anim,
        dissolveArrow?: Vec1Anim
    }
}

function customEvent(json ={}) { customEvents.push(json) }

notes.forEach(x => { if(!x.customData) x.customData = {} })
walls.forEach(x => { if(!x.customData) x.customData = {} })
bombs.forEach(x => { if(!x.customData) x.customData = {} })
arcs.forEach(x => { if(!x.customData) x.customData = {} })
chains.forEach(x => { if(!x.customData) x.customData = {} })


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

function note(fake: boolean, json: notePushType) { if(fake == true) { fakeNotes.push(json)} else { notes.push(json) } }
function wall(fake: boolean, json: wallPushType) { if(fake == true) { fakeWalls.push(json)} else { walls.push(json)}}
function bomb(fake: boolean, json: bombPushType) { if(fake == true) { fakeBombs.push(json)} else { bombs.push(json) } }
function arc(json: arcPushType) { arcs.push(json) }
function chain(fake: boolean, json: chainPushType) { if(fake == true) { fakeChains.push(json)} else { chains.push(json) } }


Deno.writeTextFileSync(OUTPUT, JSON.stringify(diff, null, 0))