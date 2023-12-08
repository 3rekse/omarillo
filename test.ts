omarillo.showOmarillo()
omarillo.setPositionCartesian(-40, 20)
omarillo.setPenColor(4)
omarillo.setSpeed(98)
for (let index = 0; index < 40; index++) {
    omarillo.moveOmarilloDirection(OmarilloDirection.Forward, 75)
    omarillo.turnOmarilloDirectionByDegrees(OmarilloTurnDirection.Right, 130)
}
