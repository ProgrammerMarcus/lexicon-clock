const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const date = new Date();
let minutes = date.getMinutes()
let hours = date.getHours();

const numbers = [
    "noll",
    "ett",
    "två",
    "tre",
    "fyra",
    "fem",
    "sex",
    "sju",
    "åtta",
    "nio",
    "tio",
    "elva",
    "tolv",
    "tretton",
    "fjorton",
    "kvart",
    
];

// loads and draws image
function slowDraw(src, rotate) {
    const img = new Image();
    img.addEventListener(
        "load",
        () => {
            if (rotate !== 0) {
                ctx.translate(canvas.width / 2, canvas.width / 2);
                ctx.rotate((rotate * Math.PI) / 180);
                ctx.translate(-canvas.width / 2, -canvas.width / 2);
            }
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.resetTransform();
        },
        false
    );
    img.src = src;
}

function render() {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // set clock face
    const btn = document.getElementById("btn");
    if (btn.dataset.state == 1) {
        // numbers
        slowDraw("assets/face.svg", 0);
        btn.dataset.state = 0;
        btn.value = "Visa tiden utan text";
    } else {
        // non
        slowDraw("assets/face-nonumbers.svg", 0);
        btn.dataset.state = 1;
        btn.value = "Visa tiden med text";
    }

    slowDraw("assets/hand-hours.svg", hours * 30);
    slowDraw("assets/hand-minutes.svg", minutes * 6);
    // needs to format into words
    
    if (minutes === 0) {
        document.getElementById("time").textContent = numbers[hours];
    } else if (minutes <= 15) {
        document.getElementById("time").textContent = numbers[minutes] + " över " + numbers[hours];
    } else if (minutes < 30) {
        document.getElementById("time").textContent = (numbers[30 - minutes]) + " i halv " + (numbers[hours + 1]);
    } else if (minutes === 30) {
        document.getElementById("time").textContent = " halv " + (numbers[hours + 1]);
    } else if (minutes < 45) {
        document.getElementById("time").textContent = (numbers[minutes - 30]) + " över halv " + (numbers[hours + 1]);
    }  else if (minutes < 60) {
        document.getElementById("time").textContent = (numbers[60 - minutes]) + " i " + (numbers[hours + 1]);
    }
}

render();

document.getElementById("btn").addEventListener("click", render);
