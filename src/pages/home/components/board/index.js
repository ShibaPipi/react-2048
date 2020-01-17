import React, { Component } from 'react';
import styles from './index.less';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellNumber: [...Array(4)].map(_ => [...Array(4)].map(_ => 0)),
    }
  }

  handleColor = (value) => {
    return value <= 4 ? '#776e65' : '#fff';
  };

  handleBackgroundColor = (value) => {
    switch (value) {
      case 2:
        return '#eee4da';
      case 4:
        return '#ede0c8';
      case 8:
        return '#f2b179';
      case 16:
        return '#f59563';
      case 32:
        return '#f67c5f';
      case 64:
        return '#f65e3b';
      case 128:
        return '#edcf72';
      case 256:
        return '#edcc61';
      case 512:
        return '#9c0';
      case 1024:
        return '#33b5e5';
      case 2048:
        return '#09c';
      case 4096:
        return '#a6c';
      case 8192:
        return '#93c';
      default:
        return '#000';
    }
  };

  render() {
    console.log(this.state.cellNumber)
    return (
      <div className={styles.board}>{
        this.state.cellNumber.map((valueArray, indexArray) =>
          valueArray.map((value, index) => (
              <div key={index} className={styles.cell}
                   style={{ 'top': `${20 + 120 * parseInt(index / 4)}px`, 'left': `${20 + 120 * (indexArray % 4)}px` }} />
            )
          )
        )}
        {
          this.state.cellNumber.map((value, index) =>
            <div key={value} className={styles.cellNumber} style={
              0 === value
                ? {
                  'width': '0',
                  'height': '0',
                  'top': `${20 + 120 * parseInt(index / 4)}px`,
                  'left': `${55 + 120 * (index % 4)}px`,
                }
                : {
                  'width': '100px',
                  'height': '100px',
                  'top': `${20 + 120 * parseInt(index / 4)}px`,
                  'left': `${20 + 120 * (index % 4)}px`,
                  'color': this.handleColor(value),
                  'background-color': this.handleBackgroundColor(value)
                }
            }>{value}</div>
          )
        }
      </div>
    );
  }
}

export default Grid;
