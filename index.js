const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const date = new Date();
let minutes = date.getMinutes()
let hours = date.getHours()

// loads and draws image
function slowDraw(src, rotate) {
    const img = new Image();
    img.addEventListener(
      "load",
      () => {
        if (rotate !== 0) {
            ctx.translate(canvas.width/2, canvas.width/2);
            ctx.rotate(rotate * Math.PI / 180);
            ctx.translate(-canvas.width/2, -canvas.width/2);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height,)
        ctx.resetTransform()
      },
      false,
    );
    img.src = src
}

function render() {
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // set clock face
    const btn = (document.getElementById("btn"))
    if (btn.dataset.state == 1) {
        // numbers
        slowDraw("assets/face.svg", 0)
        btn.dataset.state = 0
        btn.value = "Visa tiden utan text"
    } else {
        // non
        slowDraw("assets/face-nonumbers.svg", 0)
        btn.dataset.state = 1
        btn.value = "Visa tiden med text"
    }

    slowDraw("assets/hand-hours.svg", hours * 30)
    slowDraw("assets/hand-minutes.svg", minutes * 6)
    // needs to format into words
    document.getElementById("time").textContent = minutes + " över " + hours
    
    

}

render()

document.getElementById("btn").addEventListener("click", render)

