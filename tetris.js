const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.fillStyle = '#000' // Filling in canvas
context.fillRect(0, 0, canvas.width, canvas.height);

const matrix = [
      [0, 0, 0],
      [1, 1, 1],      // matrix to build the tetris blocks
      [0, 1, 0],      // Thanks smarter people
]
