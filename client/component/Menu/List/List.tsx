import React, { FC } from 'react';

import s from './List.scss';
import data from '../../../data/map';
import { Props } from './types';

const List: FC<Props> = ({ listRef, selected }) =>
  <div className={s.listArea}>
    <ul ref={listRef} className={s.listContainer}>
      {data.map((d, i) =>
        <li key={i} style={{ animationDelay: `${i / 10}s` }} >
          <div className={i === selected ? s.selected : s.notselected}>
            Stage {i === data.length - 1 ? '∞' : i}
          </div>
        </li>
      )}
    </ul>
  </div>

export default List;