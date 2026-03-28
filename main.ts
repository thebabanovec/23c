let comeon = "Smysl hry je zabit Caesara, tudiz odmitnout jeho vrazdu postrada smysl. Zkus to znovu. "
let texty = [[["Bibulus:  Zdravim priteli! Mam skvele zpravy - od dnesniho dne jsem konzulem! Jen se obavam, ze comita centuriata nezvolila jen moudre.            Caesar je konzulem, to nemuzeme dopustit! Vem si tento elixir, at se nahodou objevi v jeho poharu.", "Bibulus:  Oddanost jsi mi neprisahal pro nic za nic! Seber se a bez, nebo budes dalsi."], ["Nemam cas, ani naladu na tve zertíky. Udelas to, nebo ne?"], [""]], [[""], [""], [""]]]
//  prvni text v scene je ten ktery se objevi pri otazkach
//  level 0
//  scena 1
//  scena 1.5
//  scena 2
//  level 1
//  scena 1
//  scena 2
//  scena 3
let odpovedi = [[["Cokoliv si prejete, pane Bibule. (vezmes si lahvicku)", "Uhm… Pane, jste si jisty. To, o cem mluvite neni nic lehkovazného, je to VRAZDA!", "NIKDY! Ja slouzim Caesarovi a nikdy bych mu neublizil!", "Kdoze jste? V zivote jsem vas nevidel…"], [" Omlouvam se, pane, hned to provedu.", " Ne. Nebudu zabijet pro ciziho cloveka."], ["A02", "B02", "C02", "D02"]], [["A10", "B10", "C10", "D10"], ["A11", "B11", "C11", "D11"], ["A12", "B12", "C12", "D12"]]]
//  level 0
//  scena 1
//  scena 1.5
//  scena 2
//  level 1
//  scena 1
//  scena 2
//  scena 3
let LIMIT_RADEK = 21
let POCET_RADKU = 7
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

function limit_otazky(pocet: number) {
    return LIMIT_RADEK * (POCET_RADKU - pocet) - 3 * pocet + pocet
}

function meric_delky(what: string, noneValue: number): number {
    // zjisťovač délky textu pro
    if (what == null) {
        return noneValue
    } else {
        return what.length
    }
    
}

function delic_odpovedi(): number[] {
    // rozdělí odpovědi aby se vešly na obrazovku
    let odpoved1 = meric_delky(odpovedi[level][scena][0], 5)
    let odpoved2 = meric_delky(odpovedi[level][scena][1], 5)
    let odpoved3 = meric_delky(odpovedi[level][scena][2], 5)
    let odpoved4 = meric_delky(odpovedi[level][scena][3], 5)
    if (odpoved1 + odpoved2 + odpoved3 + odpoved4 <= limit_otazky(4)) {
        return [4, 0, 0, 0]
    } else if (odpoved1 + odpoved2 + odpoved3 <= limit_otazky(3)) {
        return [3, 1, 0, 0]
    } else if (odpoved1 + odpoved2 <= limit_otazky(2)) {
        if (odpoved3 + odpoved4 <= limit_otazky(2)) {
            return [2, 2, 0, 0]
        } else {
            return [2, 1, 1, 0]
        }
        
    }
    
    if (odpoved2 + odpoved3 + odpoved4 <= limit_otazky(3)) {
        return [1, 3, 0, 0]
    } else if (odpoved3 + odpoved2 <= limit_otazky(2)) {
        return [1, 2, 1, 0]
    } else if (odpoved3 + odpoved4 <= limit_otazky(2)) {
        return [1, 1, 2, 0]
    } else {
        return [1, 1, 1, 1]
    }
    
}

function displej_odpovedi(oznacenaOdpoved: number, lst: number[]) {
    let pozice = 0
    let temp = 0
    let deleniOdpovedi = [1]
    // oprava nejakyho bs ktery si python vymyslel
    deleniOdpovedi = lst
    while (temp < oznacenaOdpoved + 1) {
        temp = temp + deleniOdpovedi[pozice]
        pozice = pozice + 1
    }
    for (let i = temp - deleniOdpovedi[pozice - 1]; i < temp; i++) {
        if (odpovedi[level][scena][i] == null) {
            OLED.writeStringNewLine("--------")
        } else if (i == oznacenaOdpoved) {
            OLED.writeStringNewLine("0. " + odpovedi[level][scena][i])
            console.log("0" + (i + 1) + "." + odpovedi[level][scena][i])
        } else {
            OLED.writeStringNewLine(i + 1 + "." + odpovedi[level][scena][i])
            console.log(i + 1 + "." + odpovedi[level][scena][i])
        }
        
    }
    if (deleniOdpovedi[pozice + 1] != 0) {
        OLED.writeStringNewLine("........")
    }
    
}

function vybirac_textu(txtNumero: number, txt: string): string {
    if (txt == null) {
        //  mega genialni system jak mit hledani z listu i specialni texty v jednom
        return texty[level][scena][txtNumero]
    } else {
        return txt
    }
    
}

function delic_textu(txt: string): any[] {
    // rozdělí text na části co se vejdou na obrazovku
    let finalniList = []
    let pozice = 0
    let test = txt.length
    while (pozice + POCET_RADKU * LIMIT_RADEK < txt.length) {
        finalniList.push(txt.slice(pozice, pozice + POCET_RADKU * LIMIT_RADEK))
        pozice = pozice + POCET_RADKU * LIMIT_RADEK
    }
    finalniList.push(txt.slice(pozice, txt.length))
    return finalniList
}

function displej_textu(zobrazenaCast: number, lstTextu: string[]) {
    let lstTxt = []
    // oprava stejneho bs jako u odpovedi
    lstTxt = lstTextu
    OLED.writeStringNewLine(lstTxt[zobrazenaCast])
    console.log(lstTxt[zobrazenaCast])
    if (zobrazenaCast != lstTxt.length - 1) {
        OLED.writeStringNewLine(".........")
        console.log(".......")
    }
    
}

function answer_time(txtNumero: number): number {
    let changeDetector = 0
    let navigation = 0
    let rozdeleni_odpovedi = delic_odpovedi()
    let rozdeleniTxtu = delic_textu(texty[level][scena][txtNumero])
    while (!(button_pressed(confirmButton) && odpovedi[level][scena][navigation - rozdeleniTxtu.length] != null)) {
        if (button_pressed(downButton) && navigation < 4 + rozdeleniTxtu.length) {
            navigation = navigation + 1
        } else if (button_pressed(upButton) && navigation > 0) {
            navigation = navigation - 1
        }
        
        if (navigation != changeDetector) {
            OLED.clear()
            if (navigation <= rozdeleniTxtu.length) {
                displej_textu(navigation, rozdeleniTxtu)
            } else {
                displej_odpovedi(navigation - 1, rozdeleni_odpovedi)
            }
            
        }
        
        basic.pause(200)
        changeDetector = navigation
    }
    return navigation - rozdeleniTxtu.length
}

function confirm_time(txtNumero: number, txt: string) {
    let navigation = 0
    let changeDetector = 0
    let rozdeleniTxtu = delic_textu(vybirac_textu(txtNumero, txt))
    while (navigation < rozdeleniTxtu.length) {
        if (button_pressed(downButton) && navigation < rozdeleniTxtu.length) {
            navigation = navigation + 1
        } else if (button_pressed(upButton) && navigation > 0) {
            navigation = navigation - 1
        }
        
        if (changeDetector != navigation) {
            OLED.clear()
            displej_textu(navigation, rozdeleniTxtu)
        }
        
        changeDetector = navigation
    }
}

