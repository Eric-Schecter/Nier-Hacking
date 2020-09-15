import React, { FC } from 'react';

import styles from './styles.module.scss';
import data from '../../../data/map';
import { Props } from './types';

const List: FC<Props> = ({ listRef, selected }) =>
  <div className={styles.listArea}>
    <ul ref={listRef} className={styles.listContainer}>
      {data.map((d, i) =>
        <li key={i} style={{ animationDelay: `${i / 10}s` }} >
          <div className={i === selected ? styles.selected : styles.notselected}>
            Stage {i === data.length - 1 ? '∞' : i}
          </div>
        </li>
      )}
    </ul>
  </div>

export default List;