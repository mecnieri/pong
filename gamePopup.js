
const gray = '#d3d3d3'

export default class FinnishPopup {
    constructor(game) {
        this.game = game
        this.winningText = new PIXI.Text("Winner is ", style)
        this.playAgain = new PIXI.Text("Play Again ", style)
        this.playAgain.y = 60
        this.playAgain.buttonMode = true
        this.playAgain.interactive = true
        this.playAgain.cursor = 'pointer';
        this.playAgain.on("click", () => {
            this.popup.visible = false
            this.game.setState("play")
        })

        this.mainMenu = new PIXI.Text("Main Menu ", style)
        this.mainMenu.buttonMode = true
        this.mainMenu.interactive = true
        this.mainMenu.cursor = 'pointer';
        this.mainMenu.on("click", () => {
            this.popup.visible = false
            this.game.setState("start")
        })
        this.mainMenu.y = 120

        this.popup = new PIXI.Container()
        this.popup.x = 80
        this.popup.y = 150
        this.popup.addChild(this.winningText, this.playAgain, this.mainMenu)
        this.game.court.addChild(this.popup)
        this.popup.visible = false
    }
    show(winner) {
        this.popup.visible = true
        this.winningText.text = `Winner is ${winner}`
    }
}

const style = {
    fill: gray,
    fontFamily: "Courier New",
    fontSize: 30,
    fontWeight: 900
}

export class Menu {
    constructor(game) {
        this.game = game
        this.onePlayer = new PIXI.Text("One Player ", style)
        this.onePlayer.y = 60
        this.onePlayer.buttonMode = true
        this.onePlayer.interactive = true
        this.onePlayer.cursor = 'pointer';
        this.onePlayer.on("click", () => {
            this.popup.visible = false
            this.game.setState("play", 1)
        })

        this.twoPlayers = new PIXI.Text("Two Players ", style)
        this.twoPlayers.y = 120
        this.twoPlayers.buttonMode = true
        this.twoPlayers.interactive = true
        this.twoPlayers.cursor = 'pointer';
        this.twoPlayers.on("click", () => {
            this.popup.visible = false
            this.game.setState("play", 2)
        })

        this.popup = new PIXI.Container()
        this.popup.visible = false
        this.popup.x = 80
        this.popup.y = 150
        this.popup.addChild(this.onePlayer, this.twoPlayers)
        this.game.court.addChild(this.popup)
    }
    show() {
        this.popup.visible = true
    }
    hide() {
        this.popup.visible = false
    }
}