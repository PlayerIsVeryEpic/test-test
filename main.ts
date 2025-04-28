input.onPinPressed(TouchPin.P0, function () {
    if (Game_On == 1) {
        radio.sendValue("P0", 1000)
    }
})
input.onPinPressed(TouchPin.P1, function () {
    if (Game_On == 1) {
        radio.sendValue("P1", 500)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "Start") {
        Game_On = value
    }
})
let globalTime = 0
let Game_On = 0
radio.setGroup(143)
loops.everyInterval(1000, function () {
    globalTime += 1
})
