class Array2D {
    constructor(xSize, ySize) {
        this.xSize = xSize
        this.ySize = ySize
        this.lengt = xSize * ySize
        this.initialValue = 0
        this.innerArray = new Array(this.lengt)
        for (var i = 0; i < this.lengt; i++) this.innerArray[i] = this.initialValue
    }

    getAt(x, y) {
        return this.innerArray[x + this.ySize * y]
    }

    setAt(x, y, val) {
        this.innerArray[x + this.ySize * y] = val
    }

    //For debbuging
    printArray() {
        for (var i = 0; i < this.xSize; i++) {
            let row = ''
            for (var j = 0; j < this.ySize; j++) {
                row += this.getAt(i, j) + ' '
            }
            console.log(row)
        }
        console.log('')
    }
}

export default Array2D
