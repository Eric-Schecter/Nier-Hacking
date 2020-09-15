import React, { FC, useRef, useState } from 'react';

import s from './Opening.scss';
import Title from './Title';
import Typings from './Typings';
import Loading from './Loading';
import Snow from './Snow';
import { usePreLoad, useSize } from '../../hooks';
import { files } from './files';
import { Props } from './types';

const Opening: FC<Props> = ({ setStage,isStart,setIsStart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { percent } = usePreLoad(files);
  const { size } = useSize(ref);
  const [isHide, setIsHide] = useState(false);
  const toMenu = () => setStage(1);

  return <div ref={ref} className={`${s.root} ${isHide ? s.hide : ''}`}>
    {isStart
      ? <div className={s.bg}>
        <Title size={size} />
        <Typings str='Press any key' toMenu={toMenu} setIsHide={setIsHide} />
        <Snow size={size} />
      </div>
      : <Loading percent={percent} size={size} setIsStart={setIsStart}/>}
  </div>
}

export default Opening;