function confirmTime(txtNumero: number, txt: number) {
    while (!buttonPressed(confirmButton)) {
        displejTextu(txtNumero, txt)
    }
}

function displejTextu(txtNumero: number, txt: number) {
    if (txt == null) {
        //  mega genialni system jak mit hledani z listu i specialni texty v jednom
        OLED.writeStringNewLine(texty[level][scena][txtNumero])
    } else {
        OLED.writeStringNewLine(texty[level][scena][txt])
    }
    
}

function limit_otazky(pocet: number): number {
    return pocet * LIMIT_RADEK + POCET_RADKU - pocet - 3 * pocet
}

function buttonPressed(button: number): boolean {
    if (tinkercademy.ADKeyboard(button, buttons)) {
        return true
    } else {
        return false
    }
    
}

function answer_divider(): number[] {
    if (odpovedi[level][scena][1].length + odpovedi[level][scena][2].length + odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(4)) {
        return [4, 0, 0, 0]
    } else if (odpovedi[level][scena][1].length + odpovedi[level][scena][2].length + odpovedi[level][scena][3].length <= limit_otazky(3)) {
        return [3, 1, 0, 0]
    } else if (odpovedi[level][scena][1].length + odpovedi[level][scena][2].length <= limit_otazky(2)) {
        if (odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(2)) {
            return [2, 2, 0, 0]
        } else {
            return [2, 1, 1, 0]
        }
        
    } else if (odpovedi[level][scena][2].length + odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(3)) {
        return [1, 3, 0, 0]
    } else if (odpovedi[level][scena][3].length + odpovedi[level][scena][2].length <= limit_otazky(2)) {
        return [1, 2, 1, 0]
    } else if (odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(2)) {
        return [1, 1, 2, 0]
    } else {
        return [1, 1, 1, 1]
    }
    
}

function answerTime(): number {
    
    navigation2 = 1
    while (!(buttonPressed(confirmButton) && odpovedi[level][scena][navigation2 - 1] != null)) {
        if (buttonPressed(downButton) && navigation2 < 5) {
            navigation2 = navigation2 + 1
        } else if (buttonPressed(upButton) && navigation2 > 0) {
            navigation2 = navigation2 - 1
        }
        
        if (navigation2 != changeDetector) {
            OLED.clear()
        }
        
        if (navigation2 == 0) {
            displejTextu(0, null)
        } else {
            displejOdpovedi(navigation2 - 1, [])
        }
        
        basic.pause(200)
        changeDetector = navigation2
    }
    return navigation2 - 1
}

let changeDetector = 0
let navigation2 = 0
let POCET_RADKU = 0
let LIMIT_RADEK = 0
let odpovedi : string[][][] = []
let texty : string[][][] = []
let navigation = 0
let scena = 0
//  level 0
//  scena 1
//  scena 1.5
//  scena 2
//  level 1
//  scena 0
//  scena 1
//  scena 2
let level = 0
let comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
texty = [[["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem!", "Bibulus:  Oddanost jsi mi neprisahal pro nic za nic! Seber se a bez, nebo budes dalsi."], ["Nemam cas, ani naladu na tve zertíky. Udelas to, nebo ne?"], [""]], [[""], [""], [""]]]
//  prvni text v scene je ten ktery se objevi pri otazkach
//  level 1
//  scena 1
//  scena 1.5
odpovedi = [[["Cokoliv si prejete, pane Bibule. (vezmes si lahvicku)", "Uhm… Pane, jste si jisty. To, o čem mluvite neni nic lehkovazného, je to VRAZDA!", "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!", "Kdoze jste? V zivotě jsem vas nevidel…"], [" Omlouvam se, pane, hned to provedu.", " Ne. Nebudu zabijet pro ciziho cloveka."], ["A02", "B02", "C02", "D02"]], [["A10", "B10", "C10", "D10"], ["A11", "B11", "C11", "D11"], ["A12", "B12", "C12", "D12"]]]
LIMIT_RADEK = 21
POCET_RADKU = 8
let buttons = AnalogPin.P0
let upButton = ADKeys.A
let downButton = ADKeys.B
let confirmButton = ADKeys.D
OLED.init(128, 64)
OLED.writeString("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
function displejOdpovedi(oznacenaOdpoved: number, deleniOdpovedi: string) {
    //  predelat na OLED
    let pozice = 0
    let temp = 0
    while (temp < oznacenaOdpoved) {
        temp = temp + deleniOdpovedi[pozice]
        pozice = pozice + 1
    }
    for (let i = 0; i < 4; i++) {
        if (odpovedi[level][scena][i] == null) {
            OLED.writeStringNewLine("-----------")
        } else if (i == oznacenaOdpoved) {
            OLED.writeStringNewLine("0. " + texty[level][scena][i])
        } else {
            OLED.writeStringNewLine("" + (i + 1) + "." + odpovedi[level][scena][i])
        }
        
    }
}

