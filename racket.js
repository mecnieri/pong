export default class Racket extends PIXI.Container {
    constructor(game, x, up, down) {
        super()
        this.game = game
        this.x = x
        this.y = 150
        this.height = 80
        const graphics = new PIXI.Graphics();
        graphics.beginFill('#d3d3d3');
        graphics.drawRect(0, 0, 15, 80);
        graphics.endFill()
        this.game.court.rackets.addChild(this)
        this.addChild(graphics)
        this.direction = 0
        this.speed = 6
        const ticker = new PIXI.Ticker();
        ticker.add((deltaTime) => this.move(deltaTime));

        this.pressedDirections = []

        document.addEventListener("keydown", (e) => {
            ticker.start();
            if (e.key === down) {
                this.direction = 1
                this.pressedDirections.push(down)
            }
            if (e.key === up) {
                this.direction = -1
                this.pressedDirections.push(up)
            }
        })

        document.addEventListener("keyup", (e) => {
            if (e.key === down) this.pressedDirections = this.pressedDirections.filter(d => d !== down)
            if (e.key === up) this.pressedDirections = this.pressedDirections.filter(d => d !== up)
            if (this.pressedDirections.length === 0) {
                this.direction = 0
                ticker.stop();
                return
            }
            if (this.pressedDirections[this.pressedDirections.length - 1] === up) this.direction = -1
            if (this.pressedDirections[this.pressedDirections.length - 1] === down) this.direction = 1
        })
    }

    move(deltaTime) {
        let newY = this.y + this.speed * deltaTime * this.direction
        if (newY < 15) this.y = 15
        else if (newY > 480 - 80 - 15) this.y = 480 - 80 - 15
        else this.y += this.speed * deltaTime * this.direction
    }

    countDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
}

export class CPURacket extends PIXI.Container {
    constructor(game) {
        super()
        this.game = game
        this.x = 30
        this.y = 150
        this.height = 80
        const graphics = new PIXI.Graphics();
        graphics.beginFill('#d3d3d3');
        graphics.drawRect(0, 0, 15, 80);
        graphics.endFill()
        this.game.court.rackets.addChild(this)
        this.addChild(graphics)
        this.direction = 0
        this.speed = 6
        const ticker = new PIXI.Ticker();
        ticker.add((deltaTime) => this.move(deltaTime));
        ticker.start();

    }

    move() {
        let diff = (this.game.ball.y - this.y - 40) / 10

        if (diff > 2) diff = 2
        if (diff < -2) diff = -2

        let newY = this.y + diff

        if (newY < 15) this.y = 15
        else if (newY > 480 - 80 - 15) this.y = 480 - 80 - 15
        else this.y = newY


    }

    countDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }
}

