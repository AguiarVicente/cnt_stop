const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 600;
canvas.height = 680;

const img = document.querySelector('img')

function loadImage(){
    ctx.drawImage(img, 0, 80, 600, 600)
}

loadImage()

const moveHoriontal = {
    posX: 80,
    posY: 80
}

function pino(x, y, r){
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.closePath()
}

pino(140, 140, 15)
pino(180, 180, 15)