const width = 640
const gray = '#d3d3d3'
const thickness = 15
const height = 480

function drawNet(court) {
    let net = new PIXI.Container()
    for (let index = thickness; index < height; index += thickness * 2) {
        let block = new PIXI.Graphics()
        block.beginFill(gray);
        block.drawRect(0, 0, thickness, thickness);
        block.x = (width - thickness) / 2
        block.y = index
        net.addChild(block)
    }
    court.addChild(net)
}


export default function drawBoard(app) {
    const wall = new PIXI.Graphics()
    wall.beginFill(gray);
    wall.drawRect(0, 0, width, thickness);
    app.stage.addChild(wall)

    const wall2 = new PIXI.Graphics()
    wall2.beginFill(gray);
    wall2.drawRect(0, 0, width, thickness);
    wall2.y = height - thickness
    app.stage.addChild(wall2)
    drawNet(app.stage)
}