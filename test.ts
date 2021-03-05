turtle.showTurtle()
turtle.setPositionCartesian(-40, 20)
turtle.setSpeed(98)
for (let index = 0; index < 40; index++) {
    turtle.moveTurtleDirection(TurtleDirection.Forward, 75)
    turtle.turnTurtleDirectionByDegrees(TurtleTurnDirection.Right, 130)
}
