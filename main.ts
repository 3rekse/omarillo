let myTurtle = turtle.fromSprite(sprites.create(img`
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
    `, SpriteKind.Player))
myTurtle.setPositionCartesian(-40, 20)
myTurtle.setSpeed(98)
for (let index = 0; index < 35; index++) {
    myTurtle.moveDirection(TurtleDirection.Forward, 75)
    myTurtle.turnDirectionByDegrees(TurtleTurnDirection.Right, 130)
}
