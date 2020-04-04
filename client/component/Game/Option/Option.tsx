import React, { FC } from 'react';

import s from './Option.scss';
import { Props } from './types';
import { Result } from '../types'

const Option: FC<Props> = ({ result }) => {
  if (!(result === Result.success)) {
    return null;
  }
  return <div className={s.block} >
    <div className={s.container}>
      <p className={s.title}>HACKING COMPLETE</p>
      <div className={s.option}>
        <p className={s.btn}>SPACE</p>
      </div>
      <p>Next Stage</p>
      <div className={s.option}>
        <p className={s.btn}>R</p>
      </div>
      <p>Return to Menu </p>
    </div>
  </div>
}

export default Option;