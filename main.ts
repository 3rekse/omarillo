let myTurtle2 = turtle.fromSprite(sprites.create(img`
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
myTurtle2.setPositionCartesian(-40, 20)
myTurtle2.setSpeed(98)
for (let index = 0; index < 35; index++) {
    myTurtle2.moveDirection(TurtleDirection.Forward, 75)
    myTurtle2.turnDirectionByDegrees(TurtleTurnDirection.Right, 130)
}
