import React, { Component } from 'react';
import styles from './index.less';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }

  render() {
    const { score, newGame } = this.props;

    return (
      <div className={styles.panel}>
        <h1>2048</h1>
        <button className={styles.newGame} onClick={newGame}>new game</button>
        <p>score: {score}</p>
      </div>
    );
  }
}

export default Panel;
