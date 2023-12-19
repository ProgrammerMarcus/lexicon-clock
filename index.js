const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");


// loads and draws image
function slowDraw(src, x, y, width, height) {

    const img = new Image();
    img.addEventListener(
      "load",
      () => {
        ctx.drawImage(img, x, y, width, height)
      },
      false,
    );
    img.src = src
    return img

}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const btn = (document.getElementById("btn"))
    console.log("switching...")
    if (btn.dataset.state == 1) {
        // numbers
        slowDraw("assets/face.svg", 0, 0, 600, 600)
        btn.dataset.state = 0
        btn.value = "Visa tiden utan text"
    } else {
        // non
        slowDraw("assets/face-nonumbers.svg", 0, 0, 600, 600)
        btn.dataset.state = 1
        btn.value = "Visa tiden med text"
    }
}

render()

document.getElementById("btn").addEventListener("click", render)

