import React, { FC } from 'react';

import { Props, PropsDes } from './types';
import styles from './styles.module.scss';

const DesMenu: FC<PropsDes> = ({ isHiding }) =>
  <div className={`${styles.root} ${isHiding ? styles.hide : styles.show}`}>
    <div className={`${styles.content} ${styles.menu}`}>
      <div className={styles.keyArea}>
        <div className={styles.key}>W</div>
        <div className={styles.key}>S</div>
      </div>
      <p>Up/Down</p>
      <div className={styles.keyArea}>
        <div className={styles.key}>SPACE</div>
      </div>
      <p>Enter</p>
      <div className={styles.keyArea}>
        <div className={styles.key}>P</div>
      </div>
      <p>Cancel</p>
    </div>
  </div>

const DesGame: FC<PropsDes> = ({ isHiding }) =>
  <div className={`${styles.root} ${isHiding ? styles.hide : styles.show}`}>
    <div className={`${styles.content} ${styles.game}`}>
      <div className={styles.keyArea}>
        <div className={styles.key}>W</div>
        <div className={styles.key}>S</div>
        <div className={styles.key}>A</div>
        <div className={styles.key}>D</div>
      </div>
      <p>Up/Down/Left/Right</p>
      <div className={styles.keyArea}>
        <div className={styles.key}>J</div>
        <div className={styles.key}>K</div>
      </div>
      <p>Turn Left/Right</p>
      <div className={styles.keyArea}>
        <div className={styles.keyText}>HOLD</div>
        <div className={styles.key}>SPACE</div>
      </div>
      <p>Fire</p>
      <div className={styles.keyArea}>
        <div className={styles.key}>P</div>
      </div>
      <p>Pause/Cancel</p>
    </div>
  </div>

const Des: FC<Props> = ({ type, isHiding }) => {
  return type === 'menu' ? <DesMenu isHiding={isHiding} /> : <DesGame isHiding={isHiding} />
}

export default Des;