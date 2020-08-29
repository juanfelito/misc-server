/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const game = new _board2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array2D = __webpack_require__(2);

var _array2D2 = _interopRequireDefault(_array2D);

var _tile = __webpack_require__(3);

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MineSweeperBoard {
    constructor() {
        this.startButton = document.getElementById('start-game');
        this.numberOfMines = 20;
        this.gridSize = { height: 8, width: 10 };
        this.minesweeperBoard = document.getElementById('minesweeper-board');
        this.events();
    }

    events() {
        this.startButton.addEventListener('click', () => this.startGame.bind(this)());
    }

    startGame() {
        // Create the numeric abstraction for the game board
        this.numericArray = new _array2D2.default(this.gridSize.height, this.gridSize.width);

        // Place as many mines on the board as indicated by numberOfMines
        for (var i = 0; i < this.numberOfMines; i++) {
            this.placeOneMine();
        }

        // Each element determines how many mines surrounds it
        this.setAdjacentMinesCount();

        // This will print the array on the console in order to debbug
        // this.numericArray.printArray()

        // Draw the game to the screen
        this.printBoard();
    }

    placeOneMine() {
        const x = Math.floor(Math.random() * this.gridSize.height);
        const y = Math.floor(Math.random() * this.gridSize.width);

        if (this.numericArray.getAt(x, y) == 9) {
            this.placeOneMine();
        } else {
            this.numericArray.setAt(x, y, 9);
        }
    }

    setAdjacentMinesCount() {
        for (var i = 0; i < this.numericArray.xSize; i++) {
            for (var j = 0; j < this.numericArray.ySize; j++) {
                if (this.numericArray.getAt(i, j) !== 9) {
                    this.numericArray.setAt(i, j, this.calculateMinesAround(i, j));
                }
            }
        }
    }

    calculateMinesAround(x, y) {
        const initialX = x == 0 ? 0 : x - 1;
        const finalX = x + 1 > this.gridSize.height - 1 ? this.gridSize.height - 1 : x + 1;
        const initialY = y == 0 ? 0 : y - 1;
        const finalY = y + 1 > this.gridSize.width - 1 ? this.gridSize.width - 1 : y + 1;

        let counter = 0;
        for (let i = initialX; i <= finalX; i++) {
            for (let j = initialY; j <= finalY; j++) {
                if (this.numericArray.getAt(i, j) == 9) {
                    counter += 1;
                }
            }
        }

        return counter;
    }

    printBoard() {
        const height = 54 * this.gridSize.height;
        const width = 54 * this.gridSize.width;
        this.minesweeperBoard.style.width = `${width}px`;
        this.minesweeperBoard.style.height = `${height}px`;

        this.minesweeperBoard.innerHTML = '';
        for (var i = 0; i < this.numericArray.xSize; i++) {
            for (var j = 0; j < this.numericArray.ySize; j++) {
                const tileTemplate = document.createElement('div');
                tileTemplate.id = `${i}-${j}`;
                tileTemplate.className = "minesweeper-board__tile minesweeper-board__tile--closed";
                tileTemplate.oncontextmenu = function () {
                    return false;
                };
                this.minesweeperBoard.appendChild(tileTemplate);
                const tile = new _tile2.default(i, j, this.numericArray.getAt(i, j), this.numericArray.xSize, this.numericArray.ySize);
            }
        }
    }
}

exports.default = MineSweeperBoard;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Array2D {
    constructor(xSize, ySize) {
        this.xSize = xSize;
        this.ySize = ySize;
        this.lengt = xSize * ySize;
        this.initialValue = 0;
        this.innerArray = new Array(this.lengt);
        for (var i = 0; i < this.lengt; i++) this.innerArray[i] = this.initialValue;
    }

    getAt(x, y) {
        return this.innerArray[x + this.ySize * y];
    }

    setAt(x, y, val) {
        this.innerArray[x + this.ySize * y] = val;
    }

    //For debbuging
    printArray() {
        for (var i = 0; i < this.xSize; i++) {
            let row = '';
            for (var j = 0; j < this.ySize; j++) {
                row += this.getAt(i, j) + ' ';
            }
            console.log(row);
        }
        console.log('');
    }
}

exports.default = Array2D;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(4);

class MineSweeperTile {
    constructor(x, y, value, xSize, ySize) {
        this.status = _constants.states.closed;
        this.hiddenValue = value;
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.tile = document.getElementById(`${x}-${y}`);
        this.events();
    }

    events() {
        this.tile.addEventListener('click', () => this.handleClick.bind(this)());
        this.tile.addEventListener('contextmenu', () => this.handleRightClick.bind(this)());
    }

    handleClick() {
        if (this.status === _constants.states.closed) {
            this.status = _constants.states.opened;
            this.tile.className = 'minesweeper-board__tile';

            if (this.hiddenValue === 0) {
                this.handleZeroClick();
            } else if (this.hiddenValue !== 9) {
                this.tile.innerHTML = this.hiddenValue;
            } else {
                this.tile.innerHTML = '';
                this.tile.className = 'minesweeper-board__tile minesweeper-board__tile--loser';
                this.tile.appendChild((0, _constants.bombIcon)());
            }
        }
    }

    handleRightClick() {
        switch (this.status) {
            case _constants.states.closed:
                this.tile.innerHTML = '';
                this.tile.appendChild((0, _constants.flagIcon)());
                this.status = _constants.states.flagged;
                break;
            case _constants.states.flagged:
                this.tile.innerHTML = '';
                this.tile.appendChild((0, _constants.questionIcon)());
                this.status = _constants.states.question;
                break;
            case _constants.states.question:
                this.tile.innerHTML = '';
                this.status = _constants.states.closed;
                break;
            default:
                break;
        }
    }

    handleZeroClick() {
        this.tile.innerHTML = '';

        const initialX = this.x == 0 ? 0 : this.x - 1;
        const finalX = this.x + 1 > this.xSize - 1 ? this.xSize - 1 : this.x + 1;
        const initialY = this.y == 0 ? 0 : this.y - 1;
        const finalY = this.y + 1 > this.ySize - 1 ? this.ySize - 1 : this.y + 1;

        for (let i = initialX; i <= finalX; i++) {
            for (let j = initialY; j <= finalY; j++) {
                document.getElementById(`${i}-${j}`).click();
            }
        }
    }
}

exports.default = MineSweeperTile;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
const states = exports.states = {
    "closed": 0,
    "opened": 1,
    "flagged": 2,
    "question": 3
};

const flagIcon = exports.flagIcon = () => {
    const icon = document.createElement("i");
    icon.className = "fas fa-flag";

    return icon;
};

const bombIcon = exports.bombIcon = () => {
    const icon = document.createElement("i");
    icon.className = "fas fa-bomb";

    return icon;
};

const questionIcon = exports.questionIcon = () => {
    const icon = document.createElement("i");
    icon.className = "fas fa-question";

    return icon;
};

/***/ })
/******/ ]);