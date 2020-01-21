import React, { Component } from 'react';
import Panel from './components/panel';
import Board from './components/board';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      cellNumber: []
    }
  };

  render() {
    const { score, cellNumber } = this.state;

    return (
      <div>
        <Panel
          score={score}
          newGame={this.newGame}
        />
        <Board
          cellNumber={cellNumber}
        />
      </div>
    );
  }

  componentDidMount() {
    this.newGame();
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 37: // left
        this.canMoveLeft()
        && Promise.resolve()
          .then(() =>
            this.handleMoveLeft()
          )
          .then(() =>
            this.randomNumber()
          );
        break;
      case 38: // up
        this.canMoveUp();
        console.log('up');
        if (this.handleMoveUp()) {
        }
        break;
      case 39: // right
        console.log('right');
        if (this.handleMoveRight()) {
        }
        break;
      case 40: // down
        console.log('down');
        if (this.handleMoveDown()) {
        }
        break;
      default:
        return;
    }
    this.isGameOver();
  };

  handleMoveLeft = () => {
    let { cellNumber } = this.state;

    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        if (0 !== cellNumber[y][x]) {
          for (let m = 0; m < x; m++) {
            if (0 === cellNumber[y][m] && this.canGoThrough(y, m, x)) {
              cellNumber[y][m] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[y][m] === cellNumber[y][x] && this.canGoThrough()) {
              cellNumber[y][m] += cellNumber[y][x];
              cellNumber[y][x] = 0;
            }
          }
        }
      }
    }
    this.setState({
      cellNumber
    })
  };

  handleMoveUp = () => {
  };

  handleMoveRight = () => {
  };

  handleMoveDown = () => {
  };

  canMoveLeft = () =>
    this.state.cellNumber.some(valueArray =>
      valueArray.some((value, x) =>
        x > 0
        && 0 !== value
        && (0 === valueArray[x - 1] || valueArray[x - 1] === valueArray[x])
      )
    );

  canMoveUp = () =>
    this.state.cellNumber.some((valueArray, y) =>
      valueArray.some((value, x) =>
        y > 0
        && 0 !== value
        && (0 === valueArray[y - 1] || valueArray[y - 1] === valueArray[y])
      )
    );

  canMoveRight = () => {
  };

  canMoveDown = () => {
  };

  canGoThrough = (y, m, x) => {
    const { cellNumber } = this.state;
    for (let i = m + 1; i < x; i++) {
      if (0 !== cellNumber[y][i]) {
        return false;
      }
    }

    return true;
  };

  isGameOver = () => {
  };

  newGame = () =>
    Promise
      .resolve()
      .then(() =>
        this.resetBoard()
      )
      .then(() => {
        this.randomNumber();
        this.randomNumber();
      });

  resetBoard = () => {
    // let prevData = [
    //   [2, 2, 0, 2],
    //   [0, 2, 0, 2],
    //   [2, 2, 2, 2],
    //   [0, 2, 0, 2]
    // ];
    // let nextData = [
    //   [4, 2, 0, 0],
    //   [4, 0, 0, 0],
    //   [4, 4, 0, 0],
    //   [4, 0, 0, 0]
    // ];
    this.setState({
      score: 0,
      cellNumber: this.initialize2DArray(4, 4)
    });
  };

  randomNumber = () => {
    if (!this.hasSpace()) {
      return false;
    }

    let { cellNumber } = this.state;
    // 随机一个位置
    let x = this.randomCoordinate();
    let y = this.randomCoordinate();

    while (true) {
      if (0 === cellNumber[y][x]) {
        break;
      }

      x = this.randomCoordinate();
      y = this.randomCoordinate();
    }
    // 随机一个数字，并显示这个数字
    cellNumber[y][x] = Math.random() > 0.5 ? 2 : 4;

    this.setState({
      cellNumber
    });
  };

  hasSpace = () =>
    this.state.cellNumber.some(valueArray =>
      valueArray.some(value =>
        0 === value
      )
    );

  randomCoordinate = () =>
    parseInt(Math.floor(Math.random() * 4));

  initialize2DArray = (x, y, value = 0) =>
    Array(y).fill().map(() =>
      Array(x).fill(value)
    );
}

export default Home;
