import React from 'react';
import styles from './index.less';

function Header() {
  return (
    <div className={styles.panel}>
      <h1>2048</h1>
      <button className={styles.newGame}>new game</button>
      <p>score: 0</p>
    </div>
  );
}

export default Header;
