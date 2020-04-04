import React, { FC } from 'react';

import { Props, PropsDes } from './types';
import s from './Des.scss';

const DesMenu: FC<PropsDes> = ({ isHiding }) =>
  <div className={`${s.root} ${isHiding ? s.hide : s.show}`}>
    <div className={`${s.content} ${s.menu}`}>
      <div className={s.keyArea}>
        <div className={s.key}>W</div>
        <div className={s.key}>S</div>
      </div>
      <p>Up/Down</p>
      <div className={s.keyArea}>
        <div className={s.key}>SPACE</div>
      </div>
      <p>Enter</p>
      <div className={s.keyArea}>
        <div className={s.key}>P</div>
      </div>
      <p>Cancel</p>
    </div>
  </div>

const DesGame: FC<PropsDes> = ({ isHiding }) =>
  <div className={`${s.root} ${isHiding ? s.hide : s.show}`}>
    <div className={`${s.content} ${s.game}`}>
      <div className={s.keyArea}>
        <div className={s.key}>W</div>
        <div className={s.key}>S</div>
        <div className={s.key}>A</div>
        <div className={s.key}>D</div>
      </div>
      <p>Up/Down/Left/Right</p>
      <div className={s.keyArea}>
        <div className={s.key}>J</div>
        <div className={s.key}>K</div>
      </div>
      <p>Turn Left/Right</p>
      <div className={s.keyArea}>
        <div className={s.keyText}>HOLD</div>
        <div className={s.key}>SPACE</div>
      </div>
      <p>Fire</p>
      <div className={s.keyArea}>
        <div className={s.key}>P</div>
      </div>
      <p>Pause/Cancel</p>
    </div>
  </div>

const Des: FC<Props> = ({ type, isHiding }) => {
  return type === 'menu' ? <DesMenu isHiding={isHiding} /> : <DesGame isHiding={isHiding} />
}

export default Des;