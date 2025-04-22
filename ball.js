const width = 640
const thickness = 15

export class Ball extends PIXI.Container {
    constructor(game) {
        super()
        this.game = game
        this.x = (width - thickness) / 2
        this.y = 225

        const graphics = new PIXI.Graphics();
        graphics.beginFill('#d3d3d3');
        graphics.drawRect(0, 0, 15, 15);
        graphics.endFill()
        game.court.addChild(this)
        this.addChild(graphics)
        this.speedY = -1
        this.directionX = 1
        this.ticker = new PIXI.Ticker();
        console.log('dsad')
        this.ticker.add((deltaTime) => this.move(deltaTime));
    }
    start(direction) {
        this.ticker.start();
        this.x = (width - thickness) / 2
        this.y = 225
        this.speedX = 5
        this.directionX = direction
    }
    move(deltaTime) {

        let newY = this.y + this.speedY * deltaTime
        if (newY < 15) {
            newY = 15
            this.speedY *= -1
        }
        if (newY > 480 - 30) {
            newY = 480 - 30
            this.speedY *= -1
        }
        let newX = this.x + this.speedX * deltaTime * this.directionX

        this.x = newX
        this.y = newY
        this.checkCollision()
    }
    reset() {
        this.ticker.stop();

        this.x = (width - thickness) / 2
        this.y = 225

        this.speedX = 0
        this.speedY = 0
    }
    checkCollision() {
        if (this.x < -15) {
            this.reset()
            this.game.score.increaseB()
        }
        if (this.x > 640) {
            this.reset()
            this.game.score.increaseA()
        }

        if (this.x > 45 && this.x < 640 - 30 - 30) return
        if (this.x < 15 || this.x > 640 - 15) return
        if (this.x > 400) {
            if (this.y + 15 >= this.game.court.rackets.children[1].y && this.y <= this.game.court.rackets.children[1].y + 80) {
                let df = this.y - this.game.court.rackets.children[1].y
                this.directionX = -1
                this.speedX = 10
                this.x = 640 - 30 - 30
                if (this.game.court.rackets.children[1].pressedDirections.includes('ArrowUp')) {
                    this.speedY = ((df - 40) / 20) - 3
                }
                if (this.game.court.rackets.children[1].pressedDirections.includes('ArrowDown')) {
                    this.speedY = ((df - 40) / 20) + 3
                }
            }
        }

        else {
            if (this.y + 15 >= this.game.court.rackets.children[0].y && this.y <= this.game.court.rackets.children[0].y + 80) {
                let df = this.y - this.game.court.rackets.children[0].y
                this.speedX = 10
                this.directionX = 1
                console.log('first')

                this.speedY = (df - 40) / 20
                this.x = 45
                if (this.game.court.rackets.children[0].hasOwnProperty("pressedDirection")) {
                    if (this.game.court.rackets.children[0].pressedDirections.includes('ArrowUp')) {
                        this.speedY = ((df - 40) / 20) - 3
                    }
                    if (this.game.court.rackets.children[0].pressedDirections.includes('ArrowDown')) {
                        this.speedY = ((df - 40) / 20) + 3
                    }
                }
            }
        }
    }
}
