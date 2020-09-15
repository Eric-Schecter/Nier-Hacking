import React, { FC, useRef } from 'react';

import styles from './styles.module.scss';
import { Props } from './types';
import {useCover} from '../hooks';

const Cover: FC<Props> = ({ changeScene, size, ratio }) => {
  const coverRef = useRef<HTMLCanvasElement>(null);
  useCover(coverRef, changeScene, size);
  if (!changeScene) {
    return null;
  }
  return <canvas
    className={styles.cover}
    ref={coverRef}
    style={{ width: `${size.width}px`, height: `${size.height}px` }}
    width={size.width * ratio} height={size.height * ratio}
  />
}

export default Cover;