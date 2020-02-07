import React, { FC, useState, useEffect } from 'react';

import s from './Home.scss';
import { Props } from './types'

const Card: FC<Props> = ({ index, name, addNum, selectedNum }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (!isShow) { return; }
    addNum();
  }, [isShow])
  useEffect(() => {
    if (!selectedNum) {
      setIsShow(false)
    }
  }, [selectedNum])
  return <div
    className={s.area}
    style={{ animationDelay: `${index * 0.05}s` }}
  >
    <div
      className={`${s.container} ${isShow ? s.selected : ''}`}
      onClick={() => setIsShow(true)}
    >
      <img alt='card-front' src={`/img/cards/front/${name}`} className={s.front} />
      <img alt='card-back' src='/img/cards/back/0.jpg' className={s.back} />
    </div>
  </div>
}

const shuffle = (a: Array<string>) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const Home = () => {
  const [selectedNum, setSelectedNum] = useState(0);
  const addNum = (preNum: number) => setSelectedNum(preNum + 1);

  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

  const [data, setData] = useState<Array<string>>([]);

  const getImgs = () => fetch('/cardImg')
    .then(res => res.json())
    .then(res => shuffle([...res, ...res]))
    .then(res => setData(res));

  const reset = () => {
    setData([]);
    getImgs();
  }

  useEffect(() => {
    getImgs();
  }, [])

  // useEffect(() => {
  //   if (selectedNum >= 2) {
  //     setSelectedNum(0)
  //   }
  // }, [selectedNum])

  return <div className={s.root}>
    <div className={s.controlArea}>
      <button
        className={s.btn}
        onClick={() => reset()}
      >reset</button>
    </div>
    {!data.length
      ? null
      : <div className={s.cardArea}>
        {data.map((d, i) => <Card key={i} index={i} name={d} addNum={addNum} selectedNum={selectedNum} />)}
      </div>}
  </div>
}

export default Home;