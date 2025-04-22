import { createApp } from './createApp.js'
import Game from './game.js'
import drawBoard from './setup.js'

const width = 640
const height = 480
const black = '#000'


function initGame() {
  const app = createApp(width, height, black)
  root.appendChild(app.view)
  drawBoard(app)
  new Game(app)
}

initGame()
