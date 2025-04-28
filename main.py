def on_pin_pressed_p0():
    global score
    if time - globalTime > 0:
        score += 5
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

# insert sick beats here if u want

def on_received_number(receivedNumber):
    global A_antiExplode
    if A_antiExplode == 0:
        A_antiExplode += 1
radio.on_received_number(on_received_number)

def on_pin_pressed_p1():
    global score
    if time - globalTime > 0:
        score += 10
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

A_antiExplode = 0
globalTime = 0
time = 0
radio.set_group(143)
# set this to length of 1 attempt
ROUNDLENGTH = 10
# set this to break time between "A" press and game start
PAUSE = 10
highscore = 0
time = 0
score = 0
globalTime = 0
A_antiExplode = 0

def on_every_interval():
    global globalTime
    globalTime += 1
loops.every_interval(1000, on_every_interval)

def on_forever():
    global time, highscore, score, A_antiExplode
    if A_antiExplode == 1:
        time = globalTime + PAUSE
        while time > globalTime:
            radio.send_string("" + str((time - globalTime)))
        # This is clear screen command
        radio.send_number(0)
        radio.send_string("GO")
        time = globalTime + ROUNDLENGTH
        while time > globalTime:
            radio.send_string("" + str((time - globalTime)))
        if score > highscore:
            highscore = score
        basic.show_leds("""
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            """)
        basic.pause(500)
        radio.send_number(0)
        radio.send_string("Score")
        radio.send_string("" + str((score)))
        basic.pause(2000)
        radio.send_number(0)
        radio.send_string("HI")
        radio.send_string("" + str((highscore)))
        basic.pause(2000)
        radio.send_number(0)
        score = 0
        A_antiExplode = 0
basic.forever(on_forever)
