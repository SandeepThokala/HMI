console.log("Loading script.js");

let circle = radius => Math.PI * radius ** 2;

let radiusInput = document.querySelector('#radius');
let areaOutput = document.querySelector('#area');

radiusInput.addEventListener('change', e => {
    areaOutput.value = circle(Number(e.target.value)).toFixed(2);
})