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
note(
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

## Walls
the `wall()` function will push an obstacle to the output difficulty

JSON for walls include:
b: the time (beat) of the wall
x: the unmodded position of the wall on the x axis
y: the unmodded position of the wal on the y axis
d: the duration of the wall
w: the scale on x axis of the wall
h: the scale on y axis of the wall