comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
texty = [ # prvni text v scene je ten ktery se objevi pri otazkach
# level 0
    [["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem!",# scena 1
    "Bibulus:  Oddanost jsi mi neprisahal pro nic za nic! Seber se a bez, nebo budes dalsi."],
    ["Nemam cas, ani naladu na tve zertíky. Udelas to, nebo ne?"],# scena 1.5
    [""]],# scena 2
# level 1
    [[""],# scena 1
    [""],# scena 2
    [""]]# scena 3
]

odpovedi = [
# level 0
    [["Cokoliv si prejete, pane Bibule. (vezmes si lahvicku)",# scena 1
        "Uhm… Pane, jste si jisty. To, o čem mluvite neni nic lehkovazného, je to VRAZDA!",
        "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!",
        "Kdoze jste? V zivotě jsem vas nevidel…"],
    [" Omlouvam se, pane, hned to provedu.",# scena 1.5
        " Ne. Nebudu zabijet pro ciziho cloveka."],
    ["A02",# scena 2
        "B02",
        "C02",
        "D02"]],
# level 1
    [["A10",# scena 1
        "B10",
        "C10",
        "D10"],
    ["A11",# scena 2
        "B11",
        "C11",
        "D11"],
    ["A12",# scena 3
        "B12",
        "C12",
        "D12"]]
]

LIMIT_RADEK = 21
POCET_RADKU = 8

buttons = AnalogPin.P0
upButton = ADKeys.A
downButton = ADKeys.B
confirmButton = ADKeys.D

level = 0
scena = 0


OLED.init(128, 64)



def button_pressed(button):
    if tinkercademy.ad_keyboard(button, buttons):
        return True
    else:
        return False

def limit_otazky(pocet):
    return pocet * LIMIT_RADEK + POCET_RADKU - pocet - 3 * pocet

def answer_divider():
    if odpovedi[level][scena][1].length + odpovedi[level][scena][2].length + odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(4):
        return [4, 0, 0, 0]
    elif odpovedi[level][scena][1].length + odpovedi[level][scena][2].length + odpovedi[level][scena][3].length <= limit_otazky(3):
        return [3, 1, 0, 0]
    elif odpovedi[level][scena][1].length + odpovedi[level][scena][2].length <= limit_otazky(2):
        if odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(2):
            return [2, 2, 0, 0]
        else:
            return [2, 1, 1, 0]

    if odpovedi[level][scena][2].length + odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(3):
        return [1, 3, 0, 0]
    elif odpovedi[level][scena][3].length + odpovedi[level][scena][2].length <= limit_otazky(2):
        return [1, 2, 1, 0]
    elif odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(2):
        return [1, 1, 2, 0]
    else:
        return [1, 1, 1, 1]

def displej_textu(txtNumero, txt):
    if txt == None:# mega genialni system jak mit hledani z listu i specialni texty v jednom
        OLED.write_string_new_line(texty[level][scena][txtNumero])
    else:
        OLED.write_string_new_line(texty[level][scena][txt])

def displej_odpovedi(oznacenaOdpoved, deleniOdpovedi):#[4, 0, 0, 0], 0
    pozice = 0
    temp = 0
    while temp < oznacenaOdpoved + 1: #3
        temp = temp + deleniOdpovedi[pozice] #4
        pozice = pozice + 1 #1
    
    for i in range(temp-deleniOdpovedi[pozice],temp-1):#0,1,2,3
        if odpovedi[level][scena][i] == None:
            OLED.write_string_new_line("-----------")
        elif i == oznacenaOdpoved:
            OLED.write_string_new_line("0. " + odpovedi[level][scena][i])
        else:
            OLED.write_string_new_line(str(i + 1) + "." + odpovedi[level][scena][i])







def answer_time():
    changeDetector = 0
    navigation = 0
    while not (button_pressed(confirmButton) and odpovedi[level][scena][navigation - 1] != None):
        if button_pressed(downButton) and navigation < 5:
            navigation = navigation + 1
        elif button_pressed(upButton) and navigation > 0:
            navigation = navigation - 1

        if navigation != changeDetector:
            OLED.clear()
            if navigation == 0:
                displej_textu(0, None)
            else:
                displej_odpovedi(navigation - 1, [])
        basic.pause(200)
        changeDetector = navigation
    return navigation - 1

def confirm_time(txtNumero, txt):
    while not (button_pressed(confirmButton)):
        displej_textu(txtNumero, txt)









   








