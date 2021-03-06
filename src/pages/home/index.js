import React, { Component } from 'react';
import Panel from './components/panel';
import Board from './components/board';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      cellNumber: [],
      cellCompacted: []
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

  /**
   * 判断能否向某个方向移动，如果可以，移动后在随机生成一个数字
   * @param event
   */
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

  /**
   * 判断能否向左移
   * 左边是否没有数字或者左边的数字是否和当前数字相等
   */
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

  /**
   * 判断能否向上移
   */
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

  /**
   * 判断能否向右移
   */
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

  /**
   * 判断能否向下移
   */
  canMoveDown = () => {
    const { cellNumber } = this.state;

    for (let x = 0; x < 4; x++) {
      for (let y = 2; y >= 0; y--) {
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

  /**
   * 向左移动行为
   * 对每一个数字的左侧位置进行判断，是否能成为落脚点
   * 判断终点位置是否为空
   * 判断终点数是否与当前数字相等
   * 判断移动路径上是否有障碍数字
   */
  handleMoveLeft = () => {
    let { cellNumber, score, cellCompacted } = this.state;

    for (let y = 0; y < 4; y++) {
      for (let x = 1; x < 4; x++) {
        if (0 !== cellNumber[y][x]) {
          for (let m = 0; m < x; m++) {
            if (0 === cellNumber[y][m] && this.canThroughLeft(y, m, x)) {
              cellNumber[y][m] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[y][m] === cellNumber[y][x] && this.canThroughLeft(y, m, x) && !cellCompacted[y][m]) {
              cellNumber[y][m] += cellNumber[y][x];
              cellNumber[y][x] = 0;
              cellCompacted[y][m] = true;
              score += cellNumber[y][m];
            }
          }
        }
      }
    }
    this.setState({
      cellNumber,
      score,
      cellCompacted: this.initialize2DArray(4, 4, false)
    });
  };

  handleMoveUp = () => {
    let { cellNumber, score, cellCompacted } = this.state;

    for (let x = 0; x < 4; x++) {
      for (let y = 1; y < 4; y++) {
        if (0 !== cellNumber[y][x]) {
          for (let n = 0; n < y; n++) {
            if (0 === cellNumber[n][x] && this.canThroughUp(x, n, y)) {
              cellNumber[n][x] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[n][x] === cellNumber[y][x] && this.canThroughUp(x, n, y)) {
              cellNumber[n][x] += cellNumber[y][x];
              cellNumber[y][x] = 0;
              cellCompacted[n][x] = true;
              score += cellNumber[n][x];
            }
          }
        }
      }
    }
    this.setState({
      cellNumber,
      score,
      cellCompacted: this.initialize2DArray(4, 4, false)
    });
  };

  handleMoveRight = () => {
    let { cellNumber, score, cellCompacted } = this.state;

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
              cellCompacted[y][m] = true;
              score += cellNumber[y][m];
            }
          }
        }
      }
    }
    this.setState({
      cellNumber,
      score,
      cellCompacted: this.initialize2DArray(4, 4, false)
    });
  };

  handleMoveDown = () => {
    let { cellNumber, score, cellCompacted } = this.state;

    for (let x = 0; x < 4; x++) {
      for (let y = 2; y >= 0; y--) {
        if (0 !== cellNumber[y][x]) {
          for (let n = 3; n > y; n--) {

            if (0 === cellNumber[n][x] && this.canThroughDown(x, n, y)) {
              cellNumber[n][x] = cellNumber[y][x];
              cellNumber[y][x] = 0;
            } else if (cellNumber[n][x] === cellNumber[y][x] && this.canThroughDown(x, n, y)) {
              cellNumber[n][x] += cellNumber[y][x];
              cellNumber[y][x] = 0;
              cellCompacted[n][x] = true;
              score += cellNumber[n][x];
            }
          }
        }
      }
    }
    this.setState({
      cellNumber,
      score,
      cellCompacted: this.initialize2DArray(4, 4, false)
    });
  };

  /**
   * 判断 [x, m] 与 [x, y] 两点之间是否有障碍
   */
  canThroughLeft = (y, m, x) => {
    const { cellNumber } = this.state;

    for (let i = m + 1; i < x; i++) {
      if (0 !== cellNumber[y][i]) {
        return false;
      }
    }

    return true;
  };

  /**
   * 判断 [n, y] 与 [x, y] 两点之间是否有障碍
   */
  canThroughUp = (x, n, y) => {
    const { cellNumber } = this.state;

    for (let j = n + 1; j < y; j++) {
      if (0 !== cellNumber[j][x]) {
        return false;
      }
    }

    return true;
  };

  /**
   * 判断 [x, m] 与 [x, y] 两点之间是否有障碍
   */
  canThroughRight = (y, m, x) => {
    const { cellNumber } = this.state;

    for (let i = m - 1; i > x; i--) {
      if (0 !== cellNumber[y][i]) {
        return false;
      }
    }

    return true;
  };

  /**
   * 判断 [n, y] 与 [x, y] 两点之间是否有障碍
   */
  canThroughDown = (x, n, y) => {
    const { cellNumber } = this.state;

    for (let j = n - 1; j > y; j--) {
      if (0 !== cellNumber[j][x]) {
        return false;
      }
    }

    return true;
  };

  isGameOver = () => {
    if (!this.hasSpace() && this.cannotMove()) {
      alert('完蛋')
    }
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
    //   [2, 2, 4, 8],
    //   [4, 2, 4, 2],
    //   [2, 16, 2, 16],
    //   [64, 2, 2, 64]
    // ];
    this.setState({
      score: 0,
      // cellNumber: prevData,
      cellNumber: this.initialize2DArray(4, 4),
      cellCompacted: this.initialize2DArray(4, 4, false)
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

    let times = 0;
    while (times < 50) {
      if (0 === cellNumber[y][x]) {
        break;
      }

      x = this.randomCoordinate();
      y = this.randomCoordinate();
      times++;
    }

    if (50 === times) {
      for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          if (0 === cellNumber[j][i]) {
            x = i;
            y = j;
          }
        }
      }
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

  cannotMove = () =>
    !this.canMoveLeft()
    && !this.canMoveUp()
    && !this.canMoveRight()
    && !this.canMoveDown()
}

export default Home;
