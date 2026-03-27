def confirmTime(txtNumero, txt: number):
    while not (buttonPressed(confirmButton)):
        displejTextu(txtNumero, txt)
def displejTextu(txtNumero, txt):
    if txt == None:
        # mega genialni system jak mit hledani z listu i specialni texty v jednom
        OLED.write_string_new_line(texty[level][scena][txtNumero])
    else:
        OLED.write_string_new_line(texty[level][scena][txt])
def limit_otazky(pocet: number):
    return pocet * LIMIT_RADEK + POCET_RADKU - pocet - 3 * pocet
def buttonPressed(button: number):
    if tinkercademy.ad_keyboard(button, buttons):
        return True
    else:
        return False
def answer_divider():
    if len(odpovedi[level][scena][1]) + len(odpovedi[level][scena][2]) + len(odpovedi[level][scena][3]) + len(odpovedi[level][scena][4]) <= limit_otazky(4):
        return [4, 0, 0, 0]
    elif len(odpovedi[level][scena][1]) + len(odpovedi[level][scena][2]) + len(odpovedi[level][scena][3]) <= limit_otazky(3):
        return [3, 1, 0, 0]
    elif len(odpovedi[level][scena][1]) + len(odpovedi[level][scena][2]) <= limit_otazky(2):
        if len(odpovedi[level][scena][3]) + len(odpovedi[level][scena][4]) <= limit_otazky(2):
            return [2, 2, 0, 0]
        else:
            return [2, 1, 1, 0]
    elif len(odpovedi[level][scena][2]) + len(odpovedi[level][scena][3]) + len(odpovedi[level][scena][4]) <= limit_otazky(3):
        return [1, 3, 0, 0]
    elif len(odpovedi[level][scena][3]) + len(odpovedi[level][scena][2]) <= limit_otazky(2):
        return [1, 2, 1, 0]
    elif len(odpovedi[level][scena][3]) + len(odpovedi[level][scena][4]) <= limit_otazky(2):
        return [1, 1, 2, 0]
    else:
        return [1, 1, 1, 1]
def answerTime():
    global navigation2, changeDetector
    navigation2 = 1
    while not (buttonPressed(confirmButton) and odpovedi[level][scena][navigation2 - 1] != None):
        if buttonPressed(downButton) and navigation2 < 5:
            navigation2 = navigation2 + 1
        elif buttonPressed(upButton) and navigation2 > 0:
            navigation2 = navigation2 - 1
        if navigation2 != changeDetector:
            OLED.clear()
        if navigation2 == 0:
            displejTextu(0, None)
        else:
            displejOdpovedi(navigation2 - 1, [])
        basic.pause(200)
        changeDetector = navigation2
    return navigation2 - 1
changeDetector = 0
navigation2 = 0
POCET_RADKU = 0
LIMIT_RADEK = 0
odpovedi: List[List[List[str]]] = []
texty: List[List[List[str]]] = []
navigation = 0
scena = 0
# level 0
# scena 1
# scena 1.5
# scena 2
# level 1
# scena 0
# scena 1
# scena 2
level = 0
comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
texty = [[["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem!",
            "Bibulus:  Oddanost jsi mi neprisahal pro nic za nic! Seber se a bez, nebo budes dalsi."],
        ["Nemam cas, ani naladu na tve zertíky. Udelas to, nebo ne?"],
        [""]],
    [[""], [""], [""]]]
# prvni text v scene je ten ktery se objevi pri otazkach
# level 1
# scena 1
# scena 1.5
odpovedi = [[["Cokoliv si prejete, pane Bibule. (vezmes si lahvicku)",
            "Uhm… Pane, jste si jisty. To, o čem mluvite neni nic lehkovazného, je to VRAZDA!",
            "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!",
            "Kdoze jste? V zivotě jsem vas nevidel…"],
        [" Omlouvam se, pane, hned to provedu.",
            " Ne. Nebudu zabijet pro ciziho cloveka."],
        ["A02", "B02", "C02", "D02"]],
    [["A10", "B10", "C10", "D10"],
        ["A11", "B11", "C11", "D11"],
        ["A12", "B12", "C12", "D12"]]]
LIMIT_RADEK = 21
POCET_RADKU = 8
buttons = AnalogPin.P0
upButton = ADKeys.A
downButton = ADKeys.B
confirmButton = ADKeys.D
OLED.init(128, 64)
OLED.write_string("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
def displejOdpovedi(oznacenaOdpoved: number, deleniOdpovedi: any):
    # predelat na OLED
    pozice = 0
    temp = 0
    while temp < oznacenaOdpoved:
        temp = temp + deleniOdpovedi[pozice]
        pozice = pozice + 1
    for i in range(4):
        if odpovedi[level][scena][i] == None:
            OLED.write_string_new_line("-----------")
        elif i == oznacenaOdpoved:
            OLED.write_string_new_line("0. " + texty[level][scena][i])
        else:
            OLED.write_string_new_line(str(i + 1) + "." + odpovedi[level][scena][i])