import React, { FC } from 'react';

import s from './Title.scss';
import { Props } from './types';

const Title: FC<Props> = ({ str }) =>
  <div className={s.title}>
    {str.split('').map((d, i) =>
      <p key={i} className={s.showRight} style={{ animationDelay: `${i / 10}s` }}>{d}</p>)}
  </div>

export default Title;