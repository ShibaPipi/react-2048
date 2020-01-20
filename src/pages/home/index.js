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
        console.log('left');
        if (this.handleMoveLeft()) {
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

  }

  handleMoveUp = () => {
  }

  handleMoveRight = () => {
  }

  handleMoveDown = () => {
  }

  canMoveLeft = () => {
  }
  canMoveUp = () => {
  }
  canMoveRight = () => {
  }
  canMoveDown = () => {
  }

  handleGameOver = () => {
  }

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

    const { cellNumber } = this.state;
    let newCellNumber = cellNumber;
    // 随机一个位置
    let x = this.randomCoordinate();
    let y = this.randomCoordinate();

    while (true) {
      if (0 === newCellNumber[x][y]) {
        break;
      }

      x = this.randomCoordinate();
      y = this.randomCoordinate();
    }
    // 随机一个数字，并显示这个数字
    newCellNumber[x][y] = Math.random() > 0.5 ? 2 : 4;

    this.setState({
      cellNumber: newCellNumber
    });

    this.showNumber();
  };

  showNumber = () => {

  };

  hasSpace = () => {
    const { cellNumber } = this.state;

    return cellNumber.some(valueArray => valueArray.some(value => 0 === value))
  };

  randomCoordinate = () => parseInt(Math.floor(Math.random() * 4));

  initialize2DArray = (x, y, value = 0) => Array(y).fill().map(() => Array(x).fill(value));
}

export default Home;
