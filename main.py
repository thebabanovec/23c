comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
texty = [ # prvni text v scene je ten ktery se objevi pri otazkach
# level 0
    [["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem! Jen se obavam, ze comita centuriata nezvolila jen moudre.            Caesar je konzulem, to nemuzeme dopustit! Vem si tento elixir, at se nahodou objevi v jeho poharu.",# scena 1
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
        "Uhm… Pane, jste si jisty. To, o cem mluvite neni nic lehkovazného, je to VRAZDA!",
        "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!",
        "Kdoze jste? V zivote jsem vas nevidel…"],
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
POCET_RADKU = 7

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
    return LIMIT_RADEK * (POCET_RADKU-pocet) - 3 * pocet + pocet

def meric_delky(what,noneValue): #zjisťovač délky textu pro
    if what == None:
        return noneValue
    else:
        return what.length

def delic_odpovedi(): #rozdělí odpovědi aby se vešly na obrazovku
    odpoved1 = meric_delky(odpovedi[level][scena][0], 5)
    odpoved2 = meric_delky(odpovedi[level][scena][1], 5)
    odpoved3 = meric_delky(odpovedi[level][scena][2], 5)
    odpoved4 = meric_delky(odpovedi[level][scena][3], 5)

    if odpoved1 + odpoved2 + odpoved3 + odpoved4 <= limit_otazky(4):
        return [4, 0, 0, 0]
    elif odpoved1 + odpoved2 + odpoved3 <= limit_otazky(3):
        return [3, 1, 0, 0]
    elif odpoved1 + odpoved2 <= limit_otazky(2):
        if odpoved3 + odpoved4 <= limit_otazky(2):
            return [2, 2, 0, 0]
        else:
            return [2, 1, 1, 0]

    if odpoved2 + odpoved3 + odpoved4 <= limit_otazky(3):
        return [1, 3, 0, 0]
    elif odpoved3 + odpoved2 <= limit_otazky(2):
        return [1, 2, 1, 0]
    elif odpoved3 + odpoved4 <= limit_otazky(2):
        return [1, 1, 2, 0]
    else:
        return [1, 1, 1, 1]

def displej_odpovedi(oznacenaOdpoved, lst):
    pozice = 0
    temp = 0
    deleniOdpovedi = [1] #oprava nejakyho bs ktery si python vymyslel
    deleniOdpovedi = lst
    while temp < oznacenaOdpoved + 1: 
        temp = temp + deleniOdpovedi[pozice] 
        pozice = pozice + 1 
    for i in range(temp-deleniOdpovedi[pozice-1],temp):
        if odpovedi[level][scena][i] == None:
            OLED.write_string_new_line("--------")

        elif i == oznacenaOdpoved:
            OLED.write_string_new_line("0. " + odpovedi[level][scena][i])
            print("0" + (i+1) + "." + odpovedi[level][scena][i])
        else:
            OLED.write_string_new_line(i + 1 + "." + odpovedi[level][scena][i])
            print(i + 1 + "." + odpovedi[level][scena][i])
    if deleniOdpovedi[pozice + 1] != 0:
        OLED.write_string_new_line("........")



def vybirac_textu(txtNumero,txt: str):
    if txt == None: # mega genialni system jak mit hledani z listu i specialni texty v jednom
        return texty[level][scena][txtNumero]
    else:
        return txt



def delic_textu(txt: str):#rozdělí text na části co se vejdou na obrazovku
    finalniList = []
    pozice = 0
    test = txt.length
    while pozice + POCET_RADKU* LIMIT_RADEK < txt.length:
        finalniList.append(txt[pozice:pozice + POCET_RADKU * LIMIT_RADEK])
        pozice = pozice + (POCET_RADKU * LIMIT_RADEK) 
    finalniList.append(txt[pozice:txt.length])
    return finalniList

def displej_textu(zobrazenaCast, lstTextu):
    lstTxt = [] #oprava stejneho bs jako u odpovedi
    lstTxt = lstTextu
    OLED.write_string_new_line(lstTxt[zobrazenaCast])
    print(lstTxt[zobrazenaCast])
    if zobrazenaCast != lstTxt.length - 1:
        OLED.write_string_new_line(".........")
        print(".......")
    

 





def answer_time(txtNumero):
    changeDetector = 0
    navigation = 0
    rozdeleni_odpovedi = delic_odpovedi()
    rozdeleniTxtu = delic_textu(texty[level][scena][txtNumero])
    while not (button_pressed(confirmButton) and odpovedi[level][scena][navigation - rozdeleniTxtu.length] != None):
        if button_pressed(downButton) and navigation < 4 + rozdeleniTxtu.length:
            navigation = navigation + 1
        elif button_pressed(upButton) and navigation > 0:
            navigation = navigation - 1

        if navigation != changeDetector:
            OLED.clear()
            if navigation <= rozdeleniTxtu.length:
                displej_textu(navigation,rozdeleniTxtu)
            else:
                displej_odpovedi(navigation - 1, rozdeleni_odpovedi)
        basic.pause(200)
        changeDetector = navigation
    return navigation - rozdeleniTxtu.length

def confirm_time(txtNumero, txt):
    navigation = 0
    changeDetector = 0
    rozdeleniTxtu = delic_textu(vybirac_textu(txtNumero, txt))
    while navigation < rozdeleniTxtu.length:
        if button_pressed(downButton) and navigation < rozdeleniTxtu.length:
            navigation = navigation + 1
        elif button_pressed(upButton) and navigation > 0:
            navigation = navigation - 1
        if changeDetector != navigation:
            OLED.clear()
            displej_textu(navigation,rozdeleniTxtu)
        changeDetector = navigation







   








