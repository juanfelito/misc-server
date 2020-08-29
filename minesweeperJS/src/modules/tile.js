import { states, flagIcon, bombIcon, questionIcon } from './constants'

class MineSweeperTile {
    constructor(x, y, value, xSize, ySize) {
        this.status = states.closed
        this.hiddenValue = value
        this.x = x
        this.y = y
        this.xSize = xSize
        this.ySize = ySize
        this.tile = document.getElementById(`${x}-${y}`)
        this.events()
    }

    events() {
        this.tile.addEventListener('click', () => this.handleClick.bind(this)())
        this.tile.addEventListener('contextmenu', () => this.handleRightClick.bind(this)())
    }

    handleClick() {
        if (this.status === states.closed) {
            this.status = states.opened
            this.tile.className = 'minesweeper-board__tile'

            if (this.hiddenValue === 0) {
                this.handleZeroClick()
            } else if (this.hiddenValue !== 9) {
                this.tile.innerHTML = this.hiddenValue
            } else {
                this.tile.innerHTML = ''
                this.tile.className = 'minesweeper-board__tile minesweeper-board__tile--loser'
                this.tile.appendChild(bombIcon())
            }
        }
    }

    handleRightClick() {
        switch (this.status) {
            case states.closed:
                this.tile.innerHTML = ''
                this.tile.appendChild(flagIcon())
                this.status = states.flagged
                break
            case states.flagged:
                this.tile.innerHTML = ''
                this.tile.appendChild(questionIcon())
                this.status = states.question
                break
            case states.question:
                this.tile.innerHTML = ''
                this.status = states.closed
                break
            default:
                break
        }
    }

    handleZeroClick() {
        this.tile.innerHTML = ''

        const initialX = this.x == 0 ? 0 : this.x - 1
        const finalX = this.x + 1 > this.xSize - 1 ? this.xSize - 1 : this.x + 1
        const initialY = this.y == 0 ? 0 : this.y - 1
        const finalY = this.y + 1 > this.ySize - 1 ? this.ySize - 1 : this.y + 1

        for (let i = initialX; i <= finalX; i++) {
            for (let j = initialY; j <= finalY; j++) {
                document.getElementById(`${i}-${j}`).click()
            }
        }
    }
}

export default MineSweeperTile