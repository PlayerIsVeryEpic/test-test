input.onPinPressed(TouchPin.P0, function () {
    if (Math.abs(globalTime - time) > 0) {
        score += 1
    }
})
// insert sick beats here if u want
input.onButtonPressed(Button.A, function () {
    A_antiExplode += 1
})
input.onButtonPressed(Button.B, function () {
    B_antiExplode += 1
    if (A_antiExplode < 1 && B_antiExplode == 1) {
        basic.showNumber(highscore)
    }
    B_antiExplode = 0
})
let B_antiExplode = 0
let A_antiExplode = 0
let globalTime = 0
let time = 0
let highscore = 0
// set this to length of 1 attempt
let ROUNDLENGTH = 5
// set this to break time between "A" press and game start
let PAUSE = 3
highscore = 0
time = 0
let score = 0
globalTime = 0
A_antiExplode = 0
B_antiExplode = 0
loops.everyInterval(1000, function () {
    globalTime += 1
})
basic.forever(function () {
    if (A_antiExplode == 1 && B_antiExplode < 1) {
        time = globalTime + PAUSE
        while (time > globalTime) {
            basic.showNumber(Math.abs(globalTime - time))
        }
        basic.showString("GO")
        time = globalTime + ROUNDLENGTH
        while (time > globalTime) {
            basic.showNumber(Math.abs(globalTime - time))
        }
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        basic.clearScreen()
        basic.pause(500)
        basic.showNumber(score)
        basic.pause(2000)
        basic.clearScreen()
        if (score > highscore) {
            highscore = score
        }
        score = 0
        A_antiExplode = 0
        B_antiExplode = 0
    }
})
