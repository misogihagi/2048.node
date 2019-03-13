const Table = require('cli-table')
const Grid = require('./grid');

class ctrl {
    constructor() {
        this.score = 0;
    }

    start() {
        this.grid = new Grid();
        this.score = 0;
        this.generateRandom();
        this.generateRandom();
        this.drawBoard();
        this.drawGrid();
    }

    drawGrid() {
        this.grid.drawCells();
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.rangeTilesUp();
                break;
            case 'down':
                this.rangeTilesDown();
                break;
            case 'left':
                this.rangeTilesLeft();
                break;
            case 'right':
                this.rangeTilesRight();
                break;
            default:
                break;
        }
    }

    rangeTilesUp() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let y = 0; y < size; y++) {
            let cellCol = [];
            for (let x = 0; x < size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol);
            for (let x = 0; x < size; x++) {
                cells[x][y] = cellCol[x];
            }
        }

        this.action();
    }
    rangeTilesDown() {
        const cells = this.grid.cells;
        const size = this.grid.size;
        for (let y = 0; y < size; y++) {
            let cellCol = [];
            for (let x = 0; x < size; x++) {
                cellCol.push(cells[x][y]);
            }
            cellCol = this.rangeRowValue(cellCol.reverse()).reverse();
            for (let x = 0; x < size; x++) {
                cells[x][y] = cellCol[x];
            }
        }
        this.action();
    }
    rangeTilesLeft() {
        const cells = this.grid.cells,
            size = this.grid.size;
        for (let x = 0; x < size; x++) {
            cells[x] = this.rangeRowValue(cells[x]);
        }
        this.action();
    }
    rangeTilesRight() {
        const cells = this.grid.cells,
            size = this.grid.size;
        for (let x = 0; x < size; x++) {
            cells[x] = this.rangeRowValue(cells[x].reverse()).reverse();
        }
        this.action();
    }

    isWin() {

    }

    drawBoard(){
        const board = [
            ['Score', this.score]
        ]
        const table = new Table({
            chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''},
            colWidths: [30, 10]
        });
        table.push(...board);
        console.log(table.toString()+ '\n');
    }

    generateRandom() {
        let cells = this.grid.availableCell();
        if (cells.length) {
            let randomCell = cells[Math.floor(Math.random() * cells.length)];
            let value = this.randomValue();
            this.grid.setCellValue(randomCell.x, randomCell.y, value);
        }
    }

    randomValue() {
        return Math.random() < 0.9 ? 2 : 4;
    }

    rangeRowValue(arr = []) {
        let next;
        for (let i = 0; i < arr.length; i++) {
            next = arr.findIndex((c, m) => {
                return m > i && c !== "";
            })
            if (next !== -1) {
                if (arr[i] === "") {
                    arr[i] = arr[next];
                    arr[next] = "";
                    i -= 1;
                } else if (arr[i] === arr[next]) {
                    arr[i] = arr[i] * 2;
                    this.score += arr[i];
                    arr[next] = "";
                }
            }
        }
        return arr;
    }

    action() {
        this.generateRandom();
        this.drawBoard();
        this.drawGrid();
    }

}

module.exports = ctrl;