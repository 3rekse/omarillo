/**
 * Logo Turtle graphics blocks
 */
//% weight=100 color=#0f9c11 icon="\uf188"
//% groups='[]'

namespace turtle {

    enum TurtlePenMode {
        //% block="down"
        Down,
        //% block="up"
        Up,
        //% block="erase"
        Erase
    }

    export const DATA_KEY = "turtle"
    export const DEG_TO_RAD =  Math.PI / 180;

    export let backgroundColor = 0xf;
    let _bkg: Image;
    function bkg() {
        if (!_bkg) {
            _bkg = scene.backgroundImage();
            _bkg.fill(turtle.backgroundColor);
        }
        return _bkg;
    }

    /**
     * A turtle that can move a sprite
     */
    class Turtle {
        color: number = 1;
        direction: number = 0; // degrees -> starting direction is to the right
        penMode: TurtlePenMode = TurtlePenMode.Down;
        delay = 10;
        sprite: Sprite;
        bkg: Image;

        constructor(sprite: Sprite, bkg: Image) {
            this.sprite = sprite;
            this.bkg = bkg;
            this.sprite.data[turtle.DATA_KEY] = this;
        }

        /**
         * Gets the horizontal coordinate of the center of the turtle
         */
        get x() {
            return this.sprite.x;
        }

        set x(value: number) {
            this.sprite.x = value;
        }

        /**
         * Gets the vertical coordinate of the center of the turtle
         */
        get y() {
            return this.sprite.y;
        }

        set y(value: number) {
            this.sprite.y = value;
        }
    }

    /**
     * Creates a turtle that moves the given sprite
     */
    //% blockId=turtleFromSprite block="from sprite $sprite=variables_get"

    //% blockSetVariable=myTurtle
    //% group="Sprites"
    //% weight=100
    export function fromSprite(sprite: Sprite): Turtle {
        let turtle: Turtle = sprite.data[DATA_KEY];
        if (!turtle)
            turtle = new Turtle(sprite, bkg())
        return turtle;
    }

    //% block
    export function helloWorld() {

    }
}
