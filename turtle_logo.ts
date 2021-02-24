/**
 * Logo Turtle graphics blocks
 * Created by: Mr. Coxall
 * Created on: Feb 2021
 * 
 *  Another implimentation of Logo Turtle
 *  - starting code taken from: https://github.com/microsoft/pxt-screen-turtle
 *  - needed to have multiple sprites, so removed section for just 1 turtle
 */
//% weight=100 color=#0f9c11 icon="\uf188"
//% groups='[]'

enum TurtlePenMode {
    //% block="down"
    Down,
    //% block="up"
    Up,
    //% block="erase"
    Erase
}

enum TurtleTurnDirection {
    //% block="right"
    Right,
    //% block="left"
    Left
}

enum TurtleDirection {
    //% block="forward"
    Forward,
    //% block="backward"
    Backward
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

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    // blockId=turtleSpriteForward block="$this(myTurtle) forward %steps steps"
    //% steps.defl=25
    //% weight=99 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    forward(steps: number): void {
        if (!steps) return;

        const drad = this.direction * turtle.DEG_TO_RAD;
        const sn = Math.sign(steps)
        const dx = Math.cos(drad) * sn
        const dy = - Math.sin(drad) * sn
        const n = Math.abs(steps);
        const c = this.penMode == TurtlePenMode.Down ? this.color : 0;

        const firstX = this.x;
        const firstY = this.y;
        let oldX = firstX;
        let oldY = firstY;

        if (this.delay > 1) {
            // animating move...
            for (let i = 0; i < n; ++i) {
                // paint if pen down
                if (this.penMode == TurtlePenMode.Down || this.penMode == TurtlePenMode.Erase)
                    this.bkg.drawLine(oldX, oldY, this.x, this.y, c)
                // paint and update
                this.setPosition(this.x + dx, this.y + dy);
                // and wait
                pause(this.delay);

                oldX = this.x;
                oldY = this.y;
            }
        }

        // adjust final position
        this.setPosition(Math.round(firstX + dx * n), Math.round(firstY + dy * n))
        // paint if pen down
        if (this.penMode == TurtlePenMode.Down || this.penMode == TurtlePenMode.Erase)
            this.bkg.drawLine(oldX, oldY, this.x, this.y, c)
        // and wait
        pause(this.delay);
    }

    /**
     * Moves back by the given number of steps
     * @param steps number of steps to move, eg: 1
     */
    // blockId=turtleSpriteBack block="$this(myTurtle) back %steps steps"
    //% steps.defl=25
    //% weight=98 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    back(steps: number): void {
        this.forward(-steps);
    }

    /**
     * Moves direction by the given number of steps, in the given direction
     * @param direction to move in, eg: forwards
     * @param steps number of steps to move, eg: 25
     */
    //% blockId=turtleSpriteMoveDirection block="$this(myTurtle) move %direction %steps steps"
    //% steps.defl=25
    //% weight=98 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    moveDirection(direction: TurtleDirection, steps: number): void {
        if (direction == TurtleDirection.Forward) {
            this.forward(steps);
        } else {
            this.forward(-steps);
        }
    }

    /**
     * Turns the turtle right
     */
    // blockId=turtleSpriteTurnRight block="$this(myTurtle) turn right 90°"
    //% weight=97 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    turnRight(): void {
        this.direction = (this.direction - 90) % 360;
    }

    /**
     * Turns the turtle left
     */
    // blockId=turtleSpriteTurnLeft block="$this(myTurtle) turn left 90°"
    //% weight=96 blockGap=8
    //% group="Sprites"
    //% blockNamespace="turtle"
    turnLeft(): void {
        this.direction = (this.direction + 90) % 360;
    }

    /**
     * Turns the turtle
     */
    // blockId=turtleSpriteturn block="$this(myTurtle) turn left %degrees°"
    //% weight=95 blockGap=8
    //% degrees.min=-360 degrees.max=360
    //% group="Sprites"
    //% blockNamespace="turtle"
    turn(degrees: number): void {
        this.direction = (this.direction + degrees) % 360;
    }

    /**
     * Turns the turtle Direction and degrees
     */
    //% blockId=turtleSpriteTurnByDirectionAndDegrees block="$this(myTurtle) turn %direction by %degrees°"
    //% weight=94 blockGap=8
    //% direction
    //% degrees.min=0 degrees.max=360
    //% direction.defl=Right
    //% degrees.defl=90
    //% group="Sprites"
    //% blockNamespace="turtle"
    turnDirectionByDegrees(direction: TurtleTurnDirection, degrees: number): void {
        if (direction == TurtleTurnDirection.Left) {
            this.direction = (this.direction + degrees) % 360;
        } else {
            this.direction = (this.direction - degrees) % 360;
        }
        
    }

    /**
     * Display a speech bubble with the text, for the given time
     * @param text the text to say, eg: "Hello, World!"
     * @param time time to keep text on
     */
    //% weight=93
    //% blockId=turtlespritesay block="$this(myTurtle) say %text||for %millis ms"
    //% text.defl="Hello, World!"
    //% timeOnScreen.defl=1000
    //% millis.shadow=timePicker
    //% text.shadow=text
    //% inlineInputMode=inline
    //% group="Sprites"
    //% blockNamespace="turtle"
    say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        this.sprite.say(text, timeOnScreen || 1000, textColor, textBoxColor);
    }

    /**
     * Moves the turtle to the center of the screen 
     */
    //% blockGap=8
    //% blockId=turtleSpriteHome block="$this(myTurtle) home"
    //% weight=71
    //% group="Sprites"
    //% blockNamespace="turtle"
    home(): void {
        this.setPosition(80, 60);
        this.direction = 90;
    }

    /**
     * Sets the turtle position
     * @param x the horizontal position from 0 (left) to 160 (right), eg: 2
     * @param y the vertical position from 0 (top) to 120 (bottom), eg: 2
     */
    //% x.min=-80 x.max=80
    //% y.min=-60 y.max=60
    //% x.defl=0
    //% y.defl=0
    // blockId=turtleSpriteSetPosition block="$this(myTurtle) set position x %x y %y"
    //% weight=70
    //% group="Sprites"
    //% blockNamespace="turtle"
    setPosition(x: number, y: number): void {
        
        this.x = x % screen.width; 
        if (this.x < 0) 
            this.x += screen.width;
        
        this.y = y % screen.height; 
        if (this.y < 0) 
            this.y += screen.height;
    }


    /**
     * Sets the turtle position, to cartesian plan 
     * @param x the horizontal position from -80 (left) to 80 (right), eg: 0
     * @param y the vertical position from -60 (top) to 60 (bottom), eg: 0
     */
    //% x.min=-80 x.max=80
    //% y.min=-60 y.max=60
    //% x.defl=0
    //% y.defl=0
    //% blockId=turtleSpriteSetPositionCartesian block="$this(myTurtle) set position x %x y %y"
    //% weight=70
    //% group="Sprites"
    //% blockNamespace="turtle"
    setPositionCartesian(x: number, y: number): void {
        x = x + 80
        y = 60 - y

        // to avoid screen wrapping
        if (y == 120) {
            y = 119
        }
        if (x == 160) {
            x = 159
        }

        this.setPosition(x, y);
    }

    /**
     * Puts the pen down or up
     */
    //% blockGap=8
    //% blockId=turtleSpritePen block="$this(myTurtle) pen %mode"
    //% mode.defl=TurtlePenMode.Up
    //% weight=85
    //% group="Sprites"
    //% blockNamespace="turtle"
    pen(mode: TurtlePenMode): void {
        this.penMode = mode;
    }

    /**
     * Sets the pen color
     */
    //% blockGap=8
    //% blockId=turtlespritesetpencolor block="$this(myTurtle) set pen color to %color=colorindexpicker"
    //% weight=80
    //% group="Sprites"
    //% blockNamespace="turtle"
    setPenColor(color: number) {
        this.color = color & 0xf;
    }

    /**
     * Define the steps per second
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSpriteSetSpeed block="$this(myTurtle) set speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=10
    //% group="Sprites"
    //% blockNamespace="turtle"
    setSpeed(speed: number): void {
        this.delay = 100 - Math.clamp(1, 100, speed | 0);
    }

    /**
     * Stamps the image at the current turtle position
     * @param image 
     */
    //% _blockId=turtlespritestamp block="$this(myTurtle) stamp %image=screen_image_picker"
    //% group="Sprites"
    //% blockNamespace="turtle"
    stamp(image: Image) {
        this.bkg.drawImage(image, this.sprite.left + ((this.sprite.width - image.width) >> 1), this.sprite.top + ((this.sprite.height - image.height) >> 1));
        pause(this.delay);
    }

}

/**
 * Turtle graphics blocks
 */
//% weight=100 color=#0f9c11 icon="\uf188"
//% groups='["Default", "Sprites"]'
namespace turtle {
    export const DATA_KEY = "turtle"
    export const DEG_TO_RAD =  Math.PI / 180;

    export let turtleImage = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . e e . . 7 7 7 . . .
    . . . . . e e e e . 7 7 f 7 . .
    . . . . e e e d e e 7 7 7 7 . .
    . . . . e d e e d e 7 7 7 . . .
    . . . 7 e e e e e e . . . . . .
    . . . . 7 7 7 7 7 7 . . . . . .
    . . . . 7 7 . . 7 7 . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .         
    `;       
    export let backgroundColor = 0xf;

    let _bkg: Image;
    function bkg() {
        if (!_bkg) {
            _bkg = scene.backgroundImage();
            _bkg.fill(turtle.backgroundColor);
        }
        return _bkg;
    }

    let _turtle: Turtle;


    /**
     * Creates a turtle that moves the given sprite
     */
    //% blockId=turtleFromSprite block="turtle of $sprite"
    //% sprite.shadow=spritescreate
    //% blockSetVariable=myTurtle
    //% group="Sprites"
    //% weight=100
    export function fromSprite(sprite: Sprite): Turtle {
        let turtle: Turtle = sprite.data[DATA_KEY];
        if (!turtle)
            turtle = new Turtle(sprite, bkg())
        return turtle;
    }

    /**
     * Clears the drawings created by the turtle
     */
    //% _blockId=turtleClearScreen block="clear screen"
    //% weight=72
    //% group="Sprites"
    export function clearScreen() {
        //init()
        _bkg.fill(turtle.backgroundColor);
        //home()
    }

}
