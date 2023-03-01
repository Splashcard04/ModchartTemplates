This template is writted and used in [typescript](https://www.typescriptlang.org/), if you aren't fammilliar, ts is essentially js but with types (crazy how that works).  This template's advantages over others include:
* better autofill
* easy setup
disatvantages include:
* requires [deno](https://deno.land) and deno's setup

with that being said we can move on to the docs

# Documentation
## Setup
to setup a map with this template you will need to change 2 constants: the `INPUT` and `OUTPUT` these control the difficulties that will be writted to when using the template.  It's pretty self explanatory, just change `INPUT` to your difficulty with note mapping and `OUTPUT` to the difficulty where you would like to see changes
this is what a basic note looks like in this template
```ts
note(false,
    {
        b: 0,
        x: 1,
        y: 2,
        c: 1,
        d: 6,
        a: 0
    }
)
```
you will be guided through pushing with function's autofill.
## Notes
the `note()` function will push a note to the output difficulty

JSON for notes include:
b: the time (beat) of the note
x: the (unmodded) position of the note on the x axis
y: the (unmodded) position of the note on the y axis
c: the type (red or blue) of the note
d: the cut direction (1-8)
a: the angle offset of the note
customData: any animations or modded properties of the note

the fake argument will decide if the note is pushed to the fake notes array and the regular notes array.  This goes for all objects

## Walls
the `wall()` function will push an obstacle to the output difficulty

JSON for walls include:
b: the time (beat) of the wall
x: the unmodded position of the wall on the x axis
y: the unmodded position of the wall on the y axis
d: the duration of the wall
w: the scale on x axis of the wall
h: the scale on y axis of the wall
customData: any modded or animation properties of the wall
example:
```ts
wall(true, 
    {
        b: 10,
        x: 0,
        y: 2,
        d: 15,
        w: 2,
        h: 3,
        customData: {
            color: [0, 10, 1, 1]
        }
    }
)
```
## Bombs
the `bomb()` function will push a bomb to the output difficulty

JSON for bombs include:
b: the time (beat) of the wall
x: the unmodded position of the bomb on the x axis
y: the unmodded position of the omb on the y axis
customData: any modded or animation properties of the bomb

example:
```ts
bomb(false,
    {
        b: 132,
        x: 3,
        y: 1
    }
)
```

## arcs
the `arc()` function will puch an arc (slider) to the output difficulty

JSON for arcs include:

b: the time (beat) of the arc to start
c: the type (left or right) of the arc
x: the position on the x axis
y: the position on the y axis
d: the direction of the head of the arc
mu: the head multiplier
tb: the beat of the arc tail
tx: the x position of the tail
ty: the y position of the tail
tc: the tail direction
tmu: the tail multiplier
m: mid anchor mode
customData: any modded or animation properties of the arc

example:
```ts
arc(false,
    {
        b: 13,
        c: 0,
        x: 1,
        y: 3,
        d: 2,
        mu: 1,
        tb: 16,
        tx: 2,
        ty: 0,
        tc: 2,
        tmu: 1,
        m: 0
    }
)
```

## Chains
the `chain()` function will push a chain (burst slider) to the output difficulty

JSON for chains include:
b: the time (beat) of the chain
x: the x position of the head
y: the y position of the head
c: the type (red or blue) of the chain
d: the direction of the head
tb: the beat of the tail
tx: the x position of the tail
ty: the y position of the tail
sc: the amount of links on the chain
s: the squish factor of the chain
customData: any modded or animation properties of the chain

example:
```ts
chain(false,
    {
        b: 123,
        x: 0,
        y: 2,
        c: 0,
        d: 2,
        tb: 124,
        tx: 1,
        ty: 0,
        sc: 3,
        s: 0.5
    }
)
```