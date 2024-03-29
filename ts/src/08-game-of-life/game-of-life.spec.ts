class Board {
    private _aliveCells = new Set<string>();

    constructor(private nbLines: number, private nbCols: number) {

    }

    setAliveAt(x: number, y: number): void {
        this._aliveCells.add(`${x}:${y}`);
    }

    isCellAliveAt(x: number, y: number): boolean {
        return this._aliveCells.has(`${x}:${y}`);
    }

    toStringArray(): string[] {
        const result = [];
        for (let i = 0; i < this.nbLines; i++) {
            let line = '';
            for (let j = 0; j < this.nbCols; j++) {
                if (this.isCellAliveAt(i, j)) {
                    line += '*';
                } else {
                    line += '.';
                }
            }
            result.push(line);
        }
        return result;
    }

    getNbNeighbours(x: number, y: number) {
        let count = 0;
        if (this.isCellAliveAt(x - 1, y - 1)) count++;
        if (this.isCellAliveAt(x - 1, y)) count++;
        if (this.isCellAliveAt(x - 1, y + 1)) count++;
        if (this.isCellAliveAt(x, y - 1)) count++;
        if (this.isCellAliveAt(x, y + 1)) count++;
        if (this.isCellAliveAt(x + 1, y - 1)) count++;
        if (this.isCellAliveAt(x + 1, y)) count++;
        if (this.isCellAliveAt(x + 1, y + 1)) count++;
        return count;
    }
}

class GameOfLife {
    private board: Board;

    constructor(private nbLines: number, private nbCols: number, ...lines: string[]) {
        this.board = new Board(nbLines, nbCols);
        for (let lineNb = 0; lineNb < nbLines; lineNb++) {
            for (let columnNb = 0; columnNb < nbCols; columnNb++) {
                if (lines[lineNb][columnNb] === '*') {
                    this.board.setAliveAt(lineNb, columnNb);
                }
            }
        }
    }

    nextTurn(): void {
        const boardCopy = new Board(this.nbLines, this.nbCols);
        for (let lineNb = 0; lineNb < this.nbLines; lineNb++) {
            for (let columnNb = 0; columnNb < this.nbCols; columnNb++) {
                const nbNeighbours = this.board.getNbNeighbours(lineNb, columnNb);
                if (this.board.isCellAliveAt(lineNb, columnNb)) {
                    if (nbNeighbours === 2 || nbNeighbours === 3) {
                        boardCopy.setAliveAt(lineNb, columnNb);
                    }
                } else {
                    if (nbNeighbours === 3) {
                        boardCopy.setAliveAt(lineNb, columnNb);
                    }
                }
            }
        }
        this.board = boardCopy;
    }

    getBoard(): string[] {
        return this.board.toStringArray();
    }
}

interface BoardError {
    x: number;
    y: number;
    expected: string;
    actual: string;
}

function shouldMatch(board: string[], expectedBoard: string[]) {
    const errors: BoardError[] = [];
    for (let i = 0; i < expectedBoard.length; i++) {
        for (let j = 0; j < expectedBoard[i].length; j++) {
            if (expectedBoard[i][j] === '?') {
                continue;
            }
            if (expectedBoard[i][j] !== board[i][j]) {
                errors.push({
                    x: i,
                    y: j,
                    expected: expectedBoard[i][j],
                    actual: board[i][j]
                });
            }
        }
    }
    expect(errors).toEqual([]);
}

describe('Game of life', () => {
    it('should return an empty grid when an empty grid is provided', () => {
        const game = new GameOfLife(2, 3, '...', '...');
        game.nextTurn();
        expect(game.getBoard()).toEqual(['...', '...']);
    });

    it('should not kill cell that has 2 or 3 neighbours', () => {
        const game = new GameOfLife(2, 3, '***', '...');
        game.nextTurn();
        shouldMatch(game.getBoard(), ['?*?', '???']);
    })

    it('should spawn a cell that has exactly 3 neighbours', () => {
        const game = new GameOfLife(2, 3, '***', '...');
        game.nextTurn();
        shouldMatch(game.getBoard(), ['???', '.*.']);
    })

    xit('should kill any cell with less than 2 neighbours', () => {
        const game = new GameOfLife(2, 3, '**.', '...');
        game.nextTurn();
        expect(game.getBoard()).toEqual(['...', '...']);
    });
});
