import React, { FC } from 'react';

import { Props } from './types';

const Display: FC<Props> = ({ canvasRef,size,bgRatio,ratio}) => {

  return <canvas
    ref={canvasRef}
    style={{ width: `${size.width * bgRatio}px`, height: `${size.height * bgRatio}px` }}
    width={size.width * bgRatio * ratio} height={size.height * bgRatio * ratio}
  />
}

export default Display;