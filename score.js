const width = 640
const gray = '#d3d3d3'

export default class Score {
    constructor(game) {
        this.game = game
        this.scoreA = new PIXI.Text('0', style)
        this.scoreA.x = (width / 2) - 50
        this.scoreA.anchor.set(1, 0)
        this.scoreA.y = 40
        this.scoreB = new PIXI.Text('0', style)
        this.scoreB.x = (width / 2) + 50
        this.scoreB.y = 40
        this.playUntil = '3'
        game.court.addChild(this.scoreA, this.scoreB)
    }
    increaseA() {
        this.scoreA.text = +this.scoreA.text + 1
        if (this.scoreA.text === this.playUntil) {
            this.game.setState('finish', "A")
        } else {
            this.game.setState('break', -1)
        }
    }
    increaseB() {
        this.scoreB.text = +this.scoreB.text + 1
        if (this.scoreB.text === this.playUntil) {
            this.game.setState('finish', 'B')
        } else {
            this.game.setState('break', 1)
        }
    }
    reset() {
        this.scoreA.text = 0
        this.scoreB.text = 0
    }
}

const style = {
    fill: gray,
    fontFamily: "Courier New",
    fontSize: 40,
    fontWeight: 900
}