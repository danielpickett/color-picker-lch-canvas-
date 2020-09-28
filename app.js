const height = 1000
const width = 1500

const angle = document.getElementById('angle')

const canvas = document.getElementById('canvas')
canvas.height = height
canvas.width = width

const context = canvas.getContext('2d')
// context.fillStyle = 'rgb(50, 50, 50)'
// context.fillRect(0, 0, width, height)

function paint(H) {
  for (let L = 0; L < 1000; L++) {
    for (let C = 0; C < 1500; C++) {
      const color = chroma.lch(L / 10, C / 10, H)
      if (!color.clipped()) {
        // console.log(C, L)
        context.fillStyle = color.css()
        context.fillRect(C, L, 1, 1)
      } else {
        break
      }
    }
  }
}

function paintScaled(H) {
  const scale = 3

  for (let L = 0; L < 100 * scale; L++) {
    for (let C = 0; C < 150 * scale; C++) {
      const color = chroma.lch(L / scale, C / scale, H)
      if (!color.clipped()) {
        // console.log(C, L)
        context.fillStyle = color.css()
        context.fillRect(C * scale, L * scale, 1 * scale, 1 * scale)
      } else {
        break
      }
    }
  }
}

function paintImage(H) {
  const scale = 6
  const image = context.createImageData(1500, 1)
  for (let L = 0; L < 100 * scale; L++) {
    
    for (let C = 0; C < 150 * scale; C++) {
      const color = chroma.lch(L / scale, C / scale, H)
      if (!color._rgb._clipped) {
        image.data[C * 4 + 0] = color._rgb[0]
        image.data[C * 4 + 1] = color._rgb[1]
        image.data[C * 4 + 2] = color._rgb[2]
        image.data[C * 4 + 3] = 255
      } else {
        image.data[C * 4 + 3] = 0
      }
    }
    // console.log(L)
    context.putImageData(image, 0, L)
  }
}

const thePaint = (h) => {
  console.time('paint')
  // paint(h)
  // paintScaled(h)
  paintImage(h)
  console.timeEnd('paint')
}
// for (let i = 0; i < 360; i+=10)
// {
  thePaint(307)
// }


const input = document.getElementById('input')
input.addEventListener('change', function () {
  thePaint(this.value)
  angle.innerText = this.value
})
