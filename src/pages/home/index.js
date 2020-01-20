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
        if (this.handleMoveLeft()) {
          console.log('can left');
        }
        this.handleGameOver();
        break;
      case 38: // up
        console.log('up');
        if (this.handleMoveUp()) {
        }
        this.handleGameOver();
        break;
      case 39: // right
        console.log('right');
        if (this.handleMoveRight()) {
        }
        this.handleGameOver();
        break;
      case 40: // down
        console.log('down');
        if (this.handleMoveDown()) {
        }
        this.handleGameOver();
        break;
      default:
        break;
    }
  };

  handleMoveLeft = () => {
    if (!this.canMoveLeft()) {
      return false;
    }

    return true;
  };

  handleMoveUp = () => {
  };

  handleMoveRight = () => {
  };

  handleMoveDown = () => {
  };

  canMoveLeft = () => {
    const { cellNumber } = this.state;
    return cellNumber.some((valueArray, y) => {
      return valueArray.some((value, x) => {
        return y > 0 && 0 !== value && (0 === valueArray[x - 1] || valueArray[x - 1] === valueArray[x]);
      });
    })
  };

  canMoveUp = () => {
  };

  canMoveRight = () => {
  };

  canMoveDown = () => {
  };

  handleGameOver = () => {
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
    this.setState({
      score: 0,
      // cellNumber: [[2, 2, 0, 2], [0, 2, 0, 2], [2, 2, 2, 2], [0, 2, 0, 2]]
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
      if (0 === cellNumber[x][y]) {
        break;
      }

      x = this.randomCoordinate();
      y = this.randomCoordinate();
    }
    // 随机一个数字，并显示这个数字
    cellNumber[x][y] = Math.random() > 0.5 ? 2 : 4;

    this.setState({
      cellNumber
    });
  };

  hasSpace = () => this.state.cellNumber.some(valueArray => valueArray.some(value => 0 === value));

  randomCoordinate = () => parseInt(Math.floor(Math.random() * 4));

  initialize2DArray = (x, y, value = 0) => Array(y).fill().map(() => Array(x).fill(value));
}

export default Home;
