import json

INPUT = 'ExpertPlusLawless.dat'
OUTPUT = 'ExpertPlusStandard.dat'

diff = json.loads(open(INPUT, 'r'))
write = open(OUTPUT, 'w')

diff.customData = { environent: [], fakeColorNotes: [], fakeObstacles: [], fakeBombNotes: [], fakeBurstSliders: [], materials: {}, pointDefinitions: {}, customEvents: []}

notes = diff.colorNotes;
walls = diff.obstacles;
bombs = diff.bombNotes;
arcs = diff.sliders;
chains = diff.burstSliders;
lightEvents = diff.basicBeatmapEvents;
environentArray = diff.customData.environment;
fakeNotes = diff.customData.fakeColorNotes;
fakeWalls = diff.customData.fakeObstacles;
fakeBombs = diff.customData.fakeBombNotes;
fakeChains = diff.customData.fakeBurstSliders;
materials = diff.customData.materials;
customEvents = diff.customData.customEvents;
pointDefinitions = diff.customData.pointDefinitions;

def note(fake, json): 
    if fake == true:
        fakeNotes.insert(json)
    else:
        notes.insert(json)

def wall(fake, json):
    if fake == true:
        fakeWalls.insert(json)
    else:
        walls.insert(json)

def bomb(fake, json): 
    if fake == true:
        fakeBombs.insert(json)
    else:
        bombs.insert(json)

def arc(json): arcs.insert(json)

def chain(fake, json):
    if fake == true:
        fakeChains.insert(json)
    else:
        chains.insert(json)
    
def environment(json): environment.insert(json)

def customEvent(json): customEvents.insert(json)

write.write(diff)