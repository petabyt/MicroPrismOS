// Load main system files into RAM
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let characters = [
    "010111101", //a
    "110111111", //b
    "111100111", //c
    "110101110", //d
    "111110111", //e
    "111110100", //f
    "110101111", //g
    "101111101", //h
    "111010111", //i
    "001101111", //j
    "101110101", //k
    "100100111", //l
    "111111101", //m
    "111101101", //n
    "111101111", //o
    "111111100", //p
    "111111001", //q
    "111100100", //r
    "011010110", //s
];
// Set System Variables
let system = {
    brightness: 150,
    scroll: 0,
    cursor: 0,
    menu: ["apps", "pgrm", "conf", "about"]
}
function writeText(text: string, x: number, y: number, bri: number) {
    for (let i = 0; i < text.length; i++) {
        let letterNum = 0;
        for (let n = 0; n < alphabet.length; n++) {
            if (alphabet[n] === text.charAt(i)) {
                letterNum = n;
            }
        }
        let point = 0;
        for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
                if (characters[letterNum].charAt(point) === "1") {
                    scrollbit.setPixel(b + 4 * i + x, a + y, bri);
                }
                point++
            }
        }
    }
    scrollbit.show();
}
function shadePart(side: string) {
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 17; b++) {
            if (side === "bottom") {
                scrollbit.setPixel(b, a + 4, system.brightness / 2);
            } else {
                scrollbit.setPixel(b, a, system.brightness / 2);
            }
        }
    }
    scrollbit.show();
}
function showMenu() {
    if (system.scroll % 2 === 0) {
        shadePart("top");
        system.cursor++
    } else {
        shadePart("bottom");
    }
    writeText(system.menu[system.cursor - 1], 0, 0, system.brightness);
    writeText(system.menu[system.cursor], 0, 4, system.brightness);
}
function update(btn: string) {
    if (btn === "b") {
        system.scroll++
    } else {

    }
    scrollbit.clear()
    showMenu();
}
input.onButtonPressed(Button.A, function () {
    update("a");
});
input.onButtonPressed(Button.B, function () {
    update("b");
});
//Onstart
showMenu();
