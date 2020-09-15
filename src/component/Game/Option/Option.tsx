import React, { FC } from 'react';

import s from './Option.scss';
import { Props } from './types';

const Option: FC<Props> = ({ title, op1, op2 }) =>
  <div className={s.block} >
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      <div className={s.option}>
        <p className={s.btn}>{op1.key}</p>
      </div>
      <p>{op1.text}</p>
      <div className={s.option}>
        <p className={s.btn}>{op2.key}</p>
      </div>
      <p>{op2.text}</p>
    </div>
  </div>

export default Option;