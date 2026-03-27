let comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
let texty = [[["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem!", "Bibulus:  Oddanost jsi mi neprisahal pro nic za nic! Seber se a bez, nebo budes dalsi."], ["Nemam cas, ani naladu na tve zertíky. Udelas to, nebo ne?"], [""]], [[""], [""], [""]]]
//  prvni text v scene je ten ktery se objevi pri otazkach
//  level 0
//  scena 1
//  scena 1.5
//  scena 2
//  level 1
//  scena 1
//  scena 2
//  scena 3
let odpovedi = [[["Cokoliv si prejete, pane Bibule. (vezmes si lahvicku)", "Uhm… Pane, jste si jisty. To, o čem mluvite neni nic lehkovazného, je to VRAZDA!", "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!", "Kdoze jste? V zivotě jsem vas nevidel…"], [" Omlouvam se, pane, hned to provedu.", " Ne. Nebudu zabijet pro ciziho cloveka."], ["A02", "B02", "C02", "D02"]], [["A10", "B10", "C10", "D10"], ["A11", "B11", "C11", "D11"], ["A12", "B12", "C12", "D12"]]]
//  level 0
//  scena 1
//  scena 1.5
//  scena 2
//  level 1
//  scena 1
//  scena 2
//  scena 3
let LIMIT_RADEK = 21
let POCET_RADKU = 8
let buttons = AnalogPin.P0
let upButton = ADKeys.A
let downButton = ADKeys.B
let confirmButton = ADKeys.D
let level = 0
let scena = 0
OLED.init(128, 64)
function button_pressed(button: number): boolean {
    if (tinkercademy.ADKeyboard(button, buttons)) {
        return true
    } else {
        return false
    }
    
}

function limit_otazky(pocet: number): number {
    return pocet * LIMIT_RADEK + POCET_RADKU - pocet - 3 * pocet
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
        
    }
    
    if (odpovedi[level][scena][2].length + odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(3)) {
        return [1, 3, 0, 0]
    } else if (odpovedi[level][scena][3].length + odpovedi[level][scena][2].length <= limit_otazky(2)) {
        return [1, 2, 1, 0]
    } else if (odpovedi[level][scena][3].length + odpovedi[level][scena][4].length <= limit_otazky(2)) {
        return [1, 1, 2, 0]
    } else {
        return [1, 1, 1, 1]
    }
    
}

function displej_textu(txtNumero: number, txt: number) {
    if (txt == null) {
        //  mega genialni system jak mit hledani z listu i specialni texty v jednom
        OLED.writeStringNewLine(texty[level][scena][txtNumero])
    } else {
        OLED.writeStringNewLine(texty[level][scena][txt])
    }
    
}

function displej_odpovedi(oznacenaOdpoved: number, deleniOdpovedi: any) {
    // [4, 0, 0, 0], 0
    let pozice = 0
    let temp = 0
    while (temp < oznacenaOdpoved + 1) {
        // 3
        temp = temp + deleniOdpovedi[pozice]
        // 4
        pozice = pozice + 1
    }
    // 1
    for (let i = temp - deleniOdpovedi[pozice]; i < temp - 1; i++) {
        // 0,1,2,3
        if (odpovedi[level][scena][i] == null) {
            OLED.writeStringNewLine("-----------")
        } else if (i == oznacenaOdpoved) {
            OLED.writeStringNewLine("0. " + odpovedi[level][scena][i])
        } else {
            OLED.writeStringNewLine("" + (i + 1) + "." + odpovedi[level][scena][i])
        }
        
    }
}

function answer_time(): number {
    let changeDetector = 0
    let navigation = 0
    while (!(button_pressed(confirmButton) && odpovedi[level][scena][navigation - 1] != null)) {
        if (button_pressed(downButton) && navigation < 5) {
            navigation = navigation + 1
        } else if (button_pressed(upButton) && navigation > 0) {
            navigation = navigation - 1
        }
        
        if (navigation != changeDetector) {
            OLED.clear()
            if (navigation == 0) {
                displej_textu(0, null)
            } else {
                displej_odpovedi(navigation - 1, [])
            }
            
        }
        
        basic.pause(200)
        changeDetector = navigation
    }
    return navigation - 1
}

function confirm_time(txtNumero: number, txt: number) {
    while (!button_pressed(confirmButton)) {
        displej_textu(txtNumero, txt)
    }
}

