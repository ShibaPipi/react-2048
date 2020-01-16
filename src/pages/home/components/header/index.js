import React from 'react';
import styles from './index.less';

function Header() {
  return (
    <div className={styles.header}>
      <h1>2048</h1>
      <button id="newGameButton">new game</button>
      <p>score</p>
    </div>
  );
}

export default Header;
