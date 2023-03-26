"use strict";

let alreadyDone = false;

// DOM elements
let copyright = document.getElementById("copyright");
let copyrightEl = document.getElementById("cop_text");
let ownerEl = document.getElementById("owner_text");
let playerImg = document.getElementById("coverimageforplayer");

// Content states
let copPreviousState = copyrightEl.textContent;
let ownPreviousState = ownerEl.textContent;

copyright.addEventListener("mouseover", () => {
    if (alreadyDone) return;

    copyright.style.opacity = 0;
    setTimeout(function(){
        copyrightEl.textContent = "Replicated by";
        ownerEl.textContent = "Chaika Taras | KNS-11";
        copyright.style.opacity = 1;
        alreadyDone = true;
        }, 200);
})

copyright.addEventListener("mouseout", () => {
    if (!alreadyDone) return;

    copyright.style.opacity = 0;
    setTimeout(function(){
        copyrightEl.textContent = copPreviousState;
        ownerEl.textContent = ownPreviousState;
        copyright.style.opacity = 1;
        alreadyDone = false;
    }, 200);
})

playerImg.addEventListener("click", () => {
    let embedCode = '<iframe width="1280" height="720" src="https://www.youtube.com/embed/z_HWtzUHm6s?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>';
    playerImg.innerHTML = embedCode;
})

// ----- Task -----
// x
let xStart = -1;
let xEnd = 1;
let deltaX = 0.2;

// y
let yStart = -2;
let yEnd = 2;
let deltaY = 0.2;

// z
let z = 1.32;

const calculateB = function(x, y, z) {
    let firstBPart = Math.atan((Math.pow(x, 2) + y) / (z + 1));
    let secondBPart = Math.pow(Math.cos(firstBPart), 2);
    let thirdBPart = (x / y) * Math.pow(Math.E, 3 * x + y);

    return secondBPart + thirdBPart;
}

const calculateA = function(x, y, z, b) {
    let firstAPart = 1 + Math.sqrt(Math.pow(Math.sin(Math.pow(Math.abs(x + y), 0.4)), 2));
    let secondAPart = 2 + Math.pow(b, 2) + Math.pow(Math.sin(Math.pow(y, 3)), 2);
    let thirdAPart = Math.tan((3 * x) / y);

    return firstAPart / secondAPart * thirdAPart;
}

const tabulate = function(operation) {
    console.log(`\n======= Tabulating ${operation} =======\n`);
    console.log(`|x\t\t\t|y\t\t\t|${operation}`); // spaghetti code (シ. .)シ

    for (let x = xStart; x <= xEnd; x += deltaX) {
        for (let y = yStart; y <= yEnd; y += deltaY) {

            switch (operation) {
                case "a":
                    let a = calculateA(x, y, z, calculateB(x, y, z));
                    console.log(`|${x.toFixed(2)}\t\t|${y.toFixed(2)}\t\t|${a}`);
                    break;
                case "b":
                    let b = calculateB(x, y, z);
                    console.log(`|${x.toFixed(2)}\t\t|${y.toFixed(2)}\t\t|${b}`);
                    break;
                default:
                    throw new Error(`There is no "${operation}" operation!`);
                    break;
            }

        }
    }

}

// variant №6
// tabulating only a or b
try {
    tabulate("a");
    tabulate("b");
    tabulate("something else"); // throws error
} catch (e) {
    console.error(`(ﾉಥ益ಥ)ﾉ Whoops, ya got error in your code\n ${e}`)
}
