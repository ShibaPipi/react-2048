import React, { Component } from 'react';
import styles from './index.less';

class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellNumber: [...Array(16)].map(_ => 0)
    }
  }

  render() {
    console.log(this.state.cellNumber)

    return (
      <div className={styles.board}>
        {this.state.cellNumber.keys.map(value =>
          <div key={value} className={styles.cell}
               style={{ 'top': `${20 + 120 * parseInt(value / 4)}px`, 'left': `${20 + 120 * (value % 4)}px` }} />
        )}
        {
          this.state.cellNumber.map(value =>
            <div key={value} className={styles.cellNumber}>{value}</div>
          )
        }
      </div>
    );
  }
}

export default Grid;
