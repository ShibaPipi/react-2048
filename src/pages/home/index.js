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
  }

  newGame = () => {
    this.resetBoard();
    this.randomNumber();
    this.randomNumber();
  };

  resetBoard = () => {
    this.setState({
      score: 0,
      // cellNumber: [[2, 2, 0, 2], [0, 2, 0, 2], [2, 2, 2, 2], [0, 2, 0, 2]]
      cellNumber: this.initialize2DArray(4, 4)
    });
  };

  randomNumber = () => {
    if (this.hasSpace()) {
      const { cellNumber } = this.state;
      let newCellNumber = cellNumber;
      // console.log(cellNumber)
      // console.log(this.state.cellNumber)
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
    } else {
      console.log('no space')
    }
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
