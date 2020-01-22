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
        &&
        Promise.resolve()
          .then(() => this.handleMoveLeft())
          .then(() => this.randomNumber());
        break;
      case 38: // up
        this.canMoveUp()
        &&
        Promise.resolve()
          .then(() => this.handleMoveUp())
          .then(() => this.randomNumber());
        break;
      case 39: // right
        this.canMoveRight()
        &&
        Promise.resolve()
          .then(() => this.handleMoveRight())
          .then(() => this.randomNumber());
        break;
      case 40: // down
        this.canMoveDown()
        &&
        Promise.resolve()
          .then(() => this.handleMoveDown())
          .then(() => this.randomNumber());
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
            if (0 === cellNumber[y][m] && this.canThroughLeft(y, m, x)) {
              cellNumber[y][m] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[y][m] === cellNumber[y][x] && this.canThroughLeft(y, m, x)) {
              cellNumber[y][m] += cellNumber[y][x];
              cellNumber[y][x] = 0;
            }
          }
        }
      }
    }
    this.setState({
      cellNumber
    });
  };

  handleMoveUp = () => {
    let { cellNumber } = this.state;

    for (let y = 1; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        if (0 !== cellNumber[y][x]) {
          for (let n = 0; n < y; n++) {
            if (0 === cellNumber[n][x] && this.canThroughUp(x, n, y)) {
              cellNumber[n][x] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[n][x] === cellNumber[y][x] && this.canThroughUp(x, n, y)) {
              cellNumber[n][x] += cellNumber[y][x];
              cellNumber[y][x] = 0;
            }
          }
        }
      }
    }
    this.setState({
      cellNumber
    });
  };

  handleMoveRight = () => {
    let { cellNumber } = this.state;

    for (let y = 0; y < 4; y++) {
      for (let x = 2; x >= 0; x--) {
        if (0 !== cellNumber[y][x]) {
          for (let m = 3; m > x; m--) {
            if (0 === cellNumber[y][m] && this.canThroughRight(y, m, x)) {
              cellNumber[y][m] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[y][m] === cellNumber[y][x] && this.canThroughRight(y, m, x)) {
              cellNumber[y][m] += cellNumber[y][x];
              cellNumber[y][x] = 0;
            }
          }
        }
      }
    }
    this.setState({
      cellNumber
    });
  };

  handleMoveDown = () => {
    let { cellNumber } = this.state;

    for (let y = 2; y >= 0; y--) {
      for (let x = 0; x < 4; x++) {
        if (0 !== cellNumber[y][x]) {
          for (let n = 3; n > y; n--) {
            if (0 === cellNumber[n][x] && this.canThroughDown(x, n, y)) {
              cellNumber[n][x] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[n][x] === cellNumber[y][x] && this.canThroughDown(x, n, y)) {
              cellNumber[n][x] += cellNumber[y][x];
              cellNumber[y][x] = 0;
            }
          }
        }
      }
    }
    this.setState({
      cellNumber
    });
  };

  canMoveLeft = () =>
    this.state.cellNumber.some(valueArray =>
      valueArray.some((value, x) =>
        0 !== x
        &&
        0 !== value
        &&
        (0 === valueArray[x - 1] || valueArray[x - 1] === valueArray[x])
      )
    );

  canMoveUp = () => {
    const { cellNumber } = this.state;

    for (let x = 0; x < 4; x++) {
      for (let y = 1; y < 4; y++) {
        if (
          0 !== cellNumber[y][x]
          &&
          (0 === cellNumber[y - 1][x] || cellNumber[y - 1][x] === cellNumber[y][x])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  canMoveRight = () =>
    this.state.cellNumber.some(valueArray =>
      valueArray.some((value, x) =>
        3 !== x
        &&
        0 !== value
        &&
        (0 === valueArray[x + 1] || valueArray[x + 1] === valueArray[x])
      )
    );

  canMoveDown = () => {
    const { cellNumber } = this.state;

    for (let y = 2; y >= 0; y--) {
      for (let x = 0; x < 4; x++) {
        if (
          0 !== cellNumber[y][x]
          &&
          (0 === cellNumber[y + 1][x] || cellNumber[y + 1][x] === cellNumber[y][x])
        ) {
          return true;
        }
      }
    }

    return false;
  };

  canThroughLeft = (y, m, x) => {
    const { cellNumber } = this.state;

    for (let i = m + 1; i < x; i++) {
      if (0 !== cellNumber[y][i]) {
        return false;
      }
    }

    return true;
  };

  canThroughUp = (x, n, y) => {
    const { cellNumber } = this.state;

    for (let j = n + 1; j < y; j++) {
      if (0 !== cellNumber[x][j]) {
        return false;
      }
    }

    return true;
  };

  canThroughRight = (y, m, x) => {
    const { cellNumber } = this.state;

    for (let i = m + 1; i < x; i++) {
      if (0 !== cellNumber[y][i]) {
        return false;
      }
    }

    return true;
  };

  canThroughDown = (x, n, y) => {
    const { cellNumber } = this.state;
    for (let j = n + 1; j < y; j++) {
      if (0 !== cellNumber[x][j]) {
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
      .then(() => this.resetBoard())
      .then(() => {
        this.randomNumber();
        this.randomNumber();
      });

  resetBoard = () => {
    // let prevData = [
    //   [2, 0, 4, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0],
    //   [0, 0, 0, 0]
    // ];
    this.setState({
      score: 0,
      // cellNumber: prevData
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
      valueArray.some(value => 0 === value)
    );

  randomCoordinate = () => parseInt(Math.floor(Math.random() * 4));

  initialize2DArray = (x, y, value = 0) =>
    Array(y).fill().map(() => Array(x).fill(value));
}

export default Home;
