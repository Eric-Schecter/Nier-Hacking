import React, { FC } from 'react';

import { Props } from './types';

const Display: FC<Props> = ({ canvasRef,size,ratio}) => {
  return <canvas
    ref={canvasRef}
    style={{ width: `${size.width }px`, height: `${size.height }px` }}
    width={size.width  * ratio} height={size.height  * ratio}
  />
}

export default Display;