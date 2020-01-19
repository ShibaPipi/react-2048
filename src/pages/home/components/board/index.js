import React, { Component } from 'react';
import styles from './index.less';

class Board extends Component {
  render() {
    const { cellNumber } = this.props;
    // console.log(cellNumber)
    return (
      <div className={styles.board}>
        {
          cellNumber.map((valueArray, y) =>
            valueArray.map((value, x) => (
                <div key={x} className={styles.cell}
                     style={{ 'top': `${20 + 120 * y}px`, 'left': `${20 + 120 * x}px` }} />
              )
            )
          )
        }
        {
          cellNumber.map((valueArray, y) => (
              valueArray.map((value, x) => (
                  <div key={x} className={styles.cellNumber}
                       style={
                         0 === value
                           ? {
                             'width': '0',
                             'height': '0',
                             'top': `${20 + 120 * y}px`,
                             'left': `${55 + 120 * x}px`,
                             'display': 'none'
                           }
                           : {
                             'width': '100px',
                             'height': '100px',
                             'top': `${20 + 120 * y}px`,
                             'left': `${20 + 120 * x}px`,
                             'color': this.handleColor(value),
                             'backgroundColor': this.handleBackgroundColor(value)
                           }
                       }>
                    {value}
                  </div>
                )
              )
            )
          )
        }
      </div>
    )
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
}


export default Board;
