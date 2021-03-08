/**
 * Logo Turtle graphics blocks
 * Created by: Mr. Coxall
 * Created on: Feb 2021
 * 
 *  Another implimentation of Logo Turtle
 *  - starting code taken from: https://github.com/microsoft/pxt-screen-turtle
 *  - needed to have a reduced set of instructions
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

    // block no longer shown to user, but might still be called by other blocks

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    // blockId=turtleSpriteForward block="$this(myTurtle) forward %steps steps"
    //% weight=99 blockGap=8
    //% group="Sprite Commands"
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
    //% weight=98 blockGap=8
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    back(steps: number): void {
        this.forward(-steps);
    }

    /**
     * Turns the turtle
     */
    // blockId=turtleSpriteturn block="$this(myTurtle) turn %degrees"
    //% degrees.min=-180 degrees.max=180
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    turn(degrees: number): void {
        this.direction = (this.direction + degrees) % 360;
    }

    // block that are shown to user

    /**
     * Moves turtle object direction by the given number of steps, in the given direction.
     * @param direction to move in, eg: forwards
     * @param steps number of steps to move, eg: 25
     */
    //% blockId=turtleSpriteMoveDirection block="$this(myTurtle) move %direction %steps steps"
    //% steps.defl=25
    //% weight=19
    //% blockGap=8
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    moveDirection(direction: TurtleDirection, steps: number): void {
        if (direction == TurtleDirection.Forward) {
            this.forward(steps);
        } else {
            this.forward(-steps);
        }
    }

    /**
     * Turns the turtle object direction and degrees.
     */
    //% blockId=turtleSpriteTurnByDirectionAndDegrees block="$this(myTurtle) turn %direction by %degrees°"
    //% weight=18
    //% blockGap=8
    //% direction
    //% degrees.min=0 degrees.max=360
    //% direction.defl=Right
    //% degrees.defl=90
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    turnDirectionByDegrees(direction: TurtleTurnDirection, degrees: number): void {
        if (direction == TurtleTurnDirection.Left) {
            this.direction = (this.direction + degrees) % 360;
        } else {
            this.direction = (this.direction - degrees) % 360;
        }
        
    }

    /**
     * Display a speech bubble with the text, for the given time.
     * @param text the text to say, eg: "Hello, World!"
     * @param time time to keep text on
     */
    //% blockGap=8
    //% weight=17
    //% blockId=turtlespritesay block="$this(myTurtle) says %text||for %millis ms"
    //% text.defl="Hello, World!"
    //% timeOnScreen.defl=5000
    //% millis.shadow=timePicker
    //% text.shadow=text
    //% inlineInputMode=inline
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        //this.sprite.say(text, timeOnScreen || 5000, textColor, textBoxColor);
        this.sprite.say(text, timeOnScreen, textColor, textBoxColor);
    }

    /**
     * Puts the turtle's pen down or up.
     */
    //% blockGap=8
    //% blockId=turtleSpritePen block="$this(myTurtle) pen %mode"
    //% mode.defl=TurtlePenMode.Up
    //% weight=16
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    pen(mode: TurtlePenMode): void {
        this.penMode = mode;
    }

    /**
     * Sets the turtle's pen color.
     */
    //% blockGap=8
    //% blockId=turtlespritesetpencolor block="$this(myTurtle) set pen color to %color=colorindexpicker"
    //% color.defl=1
    //% weight=15
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    setPenColor(color: number) {
        this.color = color & 0xf;
    }

    /**
     * Moves the turtle to the center of the screen.
     */
    //% blockGap=8
    //% blockId=turtleSpriteHome block="$this(myTurtle) home"
    //% weight=13
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    home(): void {
        this.setPosition(80, 60);
        this.direction = 0;
    }

    /**
     * Sets the turtle position.
     * @param x the horizontal position from 0 (left) to 160 (right), eg: 2
     * @param y the vertical position from 0 (top) to 120 (bottom), eg: 2
     */
    //% x.min=0 x.max=160
    //% y.min=0 y.max=120
    // blockId=turtleSpriteSetPosition block="$this(myTurtle) set position x %x y %y"
    //% weight=12
    //% group="Sprite Commands"
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
     * Sets the turtle position, to cartesian coordinates. 
     * @param x the horizontal position from -80 (left) to 80 (right), eg: 0
     * @param y the vertical position from -60 (top) to 60 (bottom), eg: 0
     */
    //% x.min=-80 x.max=80
    //% y.min=-60 y.max=60
    //% blockId=turtleSpriteSetPositionCartesian block="$this(myTurtle) set position x %x y %y"
    //% weight=12
    //% group="Sprite Commands"
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
     * Stamps the image at the current turtle's position.
     * @param image 
     */
    //% blockGap=8
    //% _blockId=turtlespritestamp block="$this(myTurtle) stamp %image=screen_image_picker"
     //% weight=11
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    stamp(image: Image) {
        this.bkg.drawImage(image, this.sprite.left + ((this.sprite.width - image.width) >> 1), this.sprite.top + ((this.sprite.height - image.height) >> 1));
        pause(this.delay);
    }

    /**
     * Define the steps per second.
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSpriteSetSpeed block="$this(myTurtle) set speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=10
    //% group="Sprite Commands"
    //% blockNamespace="turtle"
    setSpeed(speed: number): void {
        this.delay = 100 - Math.clamp(1, 100, speed | 0);
    }
}

/**
 * Turtle graphics blocks
 */
//% weight=100 color=#0f9c11 icon="\uf188"
//% groups='["Turtle Commands", "Sprite Commands"]'
namespace turtle {
    export const DATA_KEY = "turtle"
    export const DEG_TO_RAD =  Math.PI / 180;

    export let turtleImage = img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . e e . . . . . . . . 
    . . . . . e e e e . . 7 7 7 . . 
    . . . . e e e d e e . 7 7 f 7 . 
    . . . e e e e e d e e 7 7 7 7 . 
    . . . e e d e e e e e 7 7 7 . . 
    . . 7 e e e e e e e e . . . . . 
    . 7 . 7 7 7 7 7 7 7 7 . . . . . 
    . . . 7 7 7 7 7 7 7 7 . . . . . 
    . . 7 7 7 . . . . 7 7 7 . . . . 
    . . 7 7 7 . . . . 7 7 7 . . . . 
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
    function init() {
        if (!_turtle) {
            _turtle = fromSprite(sprites.create(turtle.turtleImage.clone()))
            home()
        }
    }

    // blocks no longer used but might be called by exported blocks

    /**
     * Moves the turtle for the given amount of pixels
     * @param steps number of steps, eg: 1
     */
    // blockId=turtleForward block="forward %steps steps"
    //% weight=99 blockGap=8
    //% group="Turtle Commands"
    export function forward(steps: number): void {
        init();
        _turtle.forward(steps);
    }

    /**
     * Moves back by the given number of steps
     * @param steps number of steps to move, eg: 1
     */
    // blockId=turtleBack block="back %steps steps"
    //% weight=98 blockGap=8
    //% group="Turtle Commands"
    export function back(steps: number): void {
        forward(-steps);
    }

    /**
     * Turns the turtle
     */
    // blockId=turtleturn block="turn %degrees"
    //% degrees.min=-180 degrees.max=180
    //% group="Turtle Commands"
    export function turn(degrees: number): void {
        init();
        _turtle.turn(degrees);
    }

    // blockId=turtlerightturn block="turn right %degrees"
    //% group="Turtle Commands"
    export function rt(degrees : number): void{
        turn(-degrees)
    }

    // blockId=turtleleftturn block="turn left %degrees"
    //% group="Turtle Commands"
    export function lt(degrees : number): void{
        turn(degrees)
    }

    /**
     * Sets the turtle position
     * @param x the horizontal position from 0 (left) to 160 (right), eg: 2
     * @param y the vertical position from 0 (top) to 120 (bottom), eg: 2
     */
    //% x.min=0 x.max=160
    //% y.min=0 y.max=120
    // blockId=turtleSetPosition block="set position x %x y %y"
    //% weight=87
    //% group="Turtle Commands"
    export function setPosition(x: number, y: number): void {
        init();
        _turtle.setPosition(x, y)
    }

    // blocks visible to user

    /**
     * Show the turtle, if not already on the screen.
     */
    //% blockId=showTurtle block="show turtle"
    //% sprite.shadow=spritescreate
    //% weight=50 
    //% blockGap=8
    //% group="Turtle Commands"
    export function showTurtle(): void {
        init();
    }

    /**
     * Moves turtle by the given number of steps, in the given direction.
     * @param direction to move in, eg: forwards
     * @param steps number of steps to move, eg: 25
     */
    //% blockId=turtleMoveDirection block="move turtle %direction %steps steps"
    //% steps.defl=25
    //% weight=49
    //% blockGap=8
    //% group="Turtle Commands"
    //% blockNamespace="turtle"
    export function moveTurtleDirection(direction: TurtleDirection, steps: number): void {
        init();
        if (direction == TurtleDirection.Forward) {
            _turtle.forward(steps);
        } else {
            _turtle.forward(-steps);
        }
    }

    /**
     * Turns the turtle right or left by the given degrees.
     */
    //% blockId=turtleTurnByDirectionAndDegrees block="turn turtle %direction by %degrees°"
    //% weight=48
    //% blockGap=8
    //% direction
    //% degrees.min=0 degrees.max=360
    //% direction.defl=Right
    //% degrees.defl=90
    //% group="Turtle Commands"
    //% blockNamespace="turtle"
    export function turnTurtleDirectionByDegrees(direction: TurtleTurnDirection, degrees: number): void {
        init();
        if (direction == TurtleTurnDirection.Left) {
            _turtle.turn(degrees);
        } else {
            _turtle.turn(-degrees);
        }
        
    }

    /**
     * Display a speech bubble with the given text, for the given time.
     * @param text the text to say, eg: "Hello, World!"
     * @param time time to keep text on
     */
    //% weight=47
    //% blockId=turtlesay block="turtle says %text||for %millis ms"
    //% text.defl="Hello, World!"
    //% timeOnScreen.defl=5000
    //% millis.shadow=timePicker
    //% text.shadow=text
    //% inlineInputMode=inline
    //% group="Turtle Commands"
    //% blockNamespace="turtle"
    export function say(text: any, timeOnScreen?: number, textColor = 15, textBoxColor = 1) {
        init()
        _turtle.say(text, timeOnScreen, textColor, textBoxColor)
    }

    /**
     * Puts the turtle's pen down, up or as an eraser.
     */
    //% blockGap=8
    //% blockId=turtlePen block="set turtle's pen %mode"
    //% mode.defl=TurtlePenMode.Up
    //% weight=46
    //% group="Turtle Commands"
    export function pen(mode: TurtlePenMode): void {
        init();
        _turtle.pen(mode)
    }

    /**
     * Sets the turtle's pen color.
     */
    //% blockGap=8
    //% blockId=turtlesetpencolor block="set turtle's pen color to %color=colorindexpicker"
    //% weight=45
    //% color.defl=1
    //% group="Turtle Commands"
    export function setPenColor(color: number) {
        init();
        _turtle.setPenColor(color)
    }

    /**
     * Clears the drawings created by the turtle.
     */
    //% _blockId=turtleClearScreen block="erase turtle's trail"
    //% weight=44
    //% group="Turtle Commands"
    export function clearScreen() {
        init()
        _bkg.fill(turtle.backgroundColor);
        //home()
    }

    /**
     * Moves the turtle to the center of the screen.
     */
    //% blockGap=8
    //% blockId=turtleHome block="move turtle home"
    //% weight=43
    //% group="Turtle Commands"
    export function home(): void {
        init()
        _turtle.home()
    }

    /**
     * Sets the turtle's position, to the given cartesian coordinates.
     * @param x the horizontal position from -80 (left) to 80 (right), eg: 0
     * @param y the vertical position from -60 (top) to 60 (bottom), eg: 0
     */
    //% x.min=-80 x.max=80
    //% y.min=-60 y.max=60
    //% blockId=turtleSetPositionCartesian block="set turtle's position to (x %x, y %y)"
    //% weight=42
    //% group="Turtle Commands"
    export function setPositionCartesian(x: number, y: number): void {
        init();
        x = x + 80
        y = 60 - y

        // to avoid screen wrapping
        if (y == 120) {
            y = 119
        }
        if (x == 160) {
            x = 159
        }

        _turtle.setPosition(x, y)
    }

    /**
     * Stamps the image selected, at the current turtle's position.
     * @param image 
     */
    //% _blockId=turtlestamp block="stamp %image=screen_image_picker"
    //% weight=41
    //% group="Turtle Commands"
    export function stamp(image: Image) {
        init();      
        _turtle.stamp(image)
    }

    /**
     * Set the turtle's speed while moving.
     * @param speed eg: 50
     */
    //% blockGap=8
    //% blockId=turtleSetSpeed block="set turtle's speed %speed"
    //% speed.min=1 speed.max=100
    //% weight=40
    //% group="Turtle Commands"
    export function setSpeed(speed: number): void {
        init();
        _turtle.setSpeed(speed)
    }

    /**
     * Creates a turtle object, that moves the given sprite
     */
    //% blockId=turtleFromSprite block="turtle of $sprite=variables_get"
    //% sprite.shadow=spritescreate
    //% blockSetVariable=myTurtle
    //% group="Sprite Commands"
    //% weight=25
    export function fromSprite(sprite: Sprite): Turtle {
        let turtle: Turtle = sprite.data[DATA_KEY];
        if (!turtle)
            turtle = new Turtle(sprite, bkg())
        return turtle;
    }
}
