import React, { FC, useRef } from 'react';

import s from './Cover.scss';
import { Props } from './types';
import {useCover} from '../hooks';

const Cover: FC<Props> = ({ changeScene, size, ratio }) => {
  const coverRef = useRef<HTMLCanvasElement>(null);
  useCover(coverRef, changeScene, size);
  if (!changeScene) {
    return null;
  }
  return <canvas
    className={s.cover}
    ref={coverRef}
    style={{ width: `${size.width}px`, height: `${size.height}px` }}
    width={size.width * ratio} height={size.height * ratio}
  />
}

export default Cover;