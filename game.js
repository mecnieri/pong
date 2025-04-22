import { Ball } from './ball.js'
import FinnishPopup, { Menu } from './gamePopup.js'
import Racket, { CPURacket } from './racket.js'
import Score from './score.js'

const width = 640
const thickness = 15

export default class Game {
    constructor(app) {
        this.app = app

        this.court = new PIXI.Container()
        this.rackets = new PIXI.Container()

        this.court.addChild(this.rackets)
        this.court.rackets = this.rackets

        this.ball = new Ball(this)
        this.score = new Score(this)
        this.finnishPopup = new FinnishPopup(this)
        this.menu = new Menu(this)
        this.app.stage.addChild(this.court)
        this.setState('start')

    }

    setState(state, data) {
        switch (state) {
            case "start":
                this.menu.show()
                break;
            case "play":
                this.menu.hide()
                this.score.reset()

                if (data === 1) {
                    this.rackets.removeChildren()
                    this.CPURacket = new CPURacket(this)
                    new Racket(this, width - 30 - thickness, "ArrowUp", "ArrowDown")

                }
                if (data === 2) {
                    this.rackets.removeChildren()
                    new Racket(this, 30, "w", "s")
                    new Racket(this, width - 30 - thickness, "ArrowUp", "ArrowDown")
                }

                this.ball.start(1)

                break;
            case "pause":
                break;
            case "break":
                setTimeout(() => {
                    this.ball.start(data)
                }, 1000);
                break;
            case "finish":
                this.finnishPopup.show(data)
                break;

            default:
                break;
        }
    }
}
