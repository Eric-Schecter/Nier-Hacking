import React, { FC, useRef } from 'react';

import { Props } from './types';
import styles from './styles.module.scss';
import { useChangeOpt, useSysOpt } from './hooks';
import { useVistied } from '../../hooks';
import Des from '../Des';
import List from './List';
import Title from './Title';

const Menu: FC<Props> = ({ setStage, sceneRef }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const { visited, setVisited } = useVistied('menu');
  const { src, isHide, selected } = useChangeOpt(setStage, sceneRef, listRef, visited);
  const { isHiding } = useSysOpt(visited, setVisited);
  return <div className={`${styles.root} ${isHide ? styles.hide : ''}`}>
    <Title str='Stage' />
    <List listRef={listRef} selected={selected} />
    <div className={styles.profile}>
      <img alt='img' src={src} />
    </div>
    {!visited && <Des type='menu' isHiding={isHiding} />}
  </div>
}

export default Menu;