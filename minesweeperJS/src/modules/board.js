import Array2D from './array2D'
import MineSweeperTile from './tile'

class MineSweeperBoard {
    constructor() {
        this.startButton = document.getElementById('start-game')
        this.numberOfMines = 20
        this.gridSize = { height: 8, width: 10 }
        this.minesweeperBoard = document.getElementById('minesweeper-board')
        this.events()
    }

    events() {
        this.startButton.addEventListener('click', () => this.startGame.bind(this)())
    }

    startGame() {
        // Create the numeric abstraction for the game board
        this.numericArray = new Array2D(this.gridSize.height, this.gridSize.width)

        // Place as many mines on the board as indicated by numberOfMines
        for (var i = 0; i < this.numberOfMines; i++) {
            this.placeOneMine()
        }

        // Each element determines how many mines surrounds it
        this.setAdjacentMinesCount()

        // This will print the array on the console in order to debbug
        // this.numericArray.printArray()

        // Draw the game to the screen
        this.printBoard()
    }

    placeOneMine() {
        const x = Math.floor((Math.random() * this.gridSize.height))
        const y = Math.floor((Math.random() * this.gridSize.width))

        if (this.numericArray.getAt(x, y) == 9) {
            this.placeOneMine()
        } else {
            this.numericArray.setAt(x, y, 9)
        }
    }

    setAdjacentMinesCount() {
        for (var i = 0; i < this.numericArray.xSize; i++) {
            for (var j = 0; j < this.numericArray.ySize; j++) {
                if (this.numericArray.getAt(i, j) !== 9) {
                    this.numericArray.setAt(i, j, this.calculateMinesAround(i, j))
                }
            }
        }
    }

    calculateMinesAround(x, y) {
        const initialX = x == 0 ? 0 : x - 1
        const finalX = x + 1 > this.gridSize.height - 1 ? this.gridSize.height - 1 : x + 1
        const initialY = y == 0 ? 0 : y - 1
        const finalY = y + 1 > this.gridSize.width - 1 ? this.gridSize.width - 1 : y + 1

        let counter = 0
        for (let i = initialX; i <= finalX; i++) {
            for (let j = initialY; j <= finalY; j++) {
                if (this.numericArray.getAt(i, j) == 9) {
                    counter += 1
                }
            }
        }

        return counter
    }

    printBoard() {
        const height = 54 * this.gridSize.height
        const width = 54 * this.gridSize.width
        this.minesweeperBoard.style.width = `${width}px`
        this.minesweeperBoard.style.height = `${height}px`

        this.minesweeperBoard.innerHTML = ''
        for (var i = 0; i < this.numericArray.xSize; i++) {
            for (var j = 0; j < this.numericArray.ySize; j++) {
                const tileTemplate = document.createElement('div')
                tileTemplate.id = `${i}-${j}`
                tileTemplate.className = "minesweeper-board__tile minesweeper-board__tile--closed"
                tileTemplate.oncontextmenu = function () {return false}
                this.minesweeperBoard.appendChild(tileTemplate)
                const tile = new MineSweeperTile(i, j, this.numericArray.getAt(i, j), this.numericArray.xSize, this.numericArray.ySize)
            }
        }
    }
}

export default MineSweeperBoard
