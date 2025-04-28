input.onPinPressed(TouchPin.P0, function () {
    if (time - globalTime > 0) {
        score += 5
    }
})
// insert sick beats here if u want
input.onButtonPressed(Button.A, function () {
    if (A_antiExplode == 0) {
        A_antiExplode += 1
    }
})
input.onPinPressed(TouchPin.P1, function () {
    if (time - globalTime > 0) {
        score += 10
    }
})
let A_antiExplode = 0
let globalTime = 0
let time = 0
radio.setGroup(143)
// set this to length of 1 attempt
let ROUNDLENGTH = 3
// set this to break time between "A" press and game start
let PAUSE = 3
let highscore = 0
time = 0
let score = 0
globalTime = 0
A_antiExplode = 0
loops.everyInterval(1000, function () {
    globalTime += 1
})
basic.forever(function () {
    if (A_antiExplode == 1) {
        time = globalTime + PAUSE
        while (time > globalTime) {
            radio.sendValue("c", time - globalTime)
        }
        basic.clearScreen()
        radio.sendValue("GO", 1)
        time = globalTime + ROUNDLENGTH
        while (time > globalTime) {
            radio.sendValue("c", time - globalTime)
        }
        if (score > highscore) {
            highscore = score
        }
        radio.sendValue("a", score)
        radio.sendValue("b", highscore)
        score = 0
        A_antiExplode = 0
        basic.clearScreen()
    }
})
