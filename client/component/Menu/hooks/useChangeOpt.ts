import { useState, useEffect, useRef } from 'react';
import { delay } from '../../../functions/delay';
import { SysOpt, Direction } from '../../../types';
import data from '../../../map';
import { getContext } from '../../Home';
import { sounds } from '../../../sounds';

export const useChangeOpt = (setStage: Function, sceneRef: React.MutableRefObject<number>,
  listRef: React.RefObject<HTMLUListElement>,visited:boolean) => {
  const selectedRef = useRef(0);
  const [selected, setSelected] = useState(0);
  const audioRef = getContext();
  const keydown = async (e: KeyboardEvent) => {
    const sHieght = listRef.current?.scrollHeight || 0;
    const sTop = listRef.current?.scrollTop || 0;
    const cHieght = listRef.current?.clientHeight || 0;
    switch (e.keyCode) {
      case SysOpt.space:
        setIsHide(true);
        audioRef.current?.play(sounds.enter.src);
        sceneRef.current = selectedRef.current;
        await delay(500);
        setStage(2);
        break;
      // case SysOpt.return:
      //   setIsHide(true);
      //   audioRef.current('/media/button_enter.wav')
      //   await delay(500);
      //   setStage(0);
      //   break;
      case Direction.down:
        if (selectedRef.current === data.length - 1) {
          setSelected(0);
          listRef.current?.scrollTo(0, 0);
        } else {
          setSelected(pre => pre + 1);
          if ((selectedRef.current + 1) * 60 - sTop > cHieght - 30) {
            listRef.current?.scrollTo(0, (selectedRef.current + 2) * 60 - cHieght);
          }
        }
        audioRef.current?.play(sounds.select.src);

        break;
      case Direction.top:
        if (selectedRef.current === 0) {
          setSelected(data.length - 1);
          listRef.current?.scrollTo(0, sHieght);
        } else {
          setSelected(pre => pre - 1);
          if ((selectedRef.current - 1) * 60 - sTop < 0) {
            listRef.current?.scrollTo(0, (selectedRef.current - 1) * 60);
          }
        }
        audioRef.current?.play(sounds.select.src);
        break;
      default:
        break;
    }
  }
  const [src, setSrc] = useState(data[0].profile);
  useEffect(() => {
    selectedRef.current = selected;
    setSrc(data[selected].profile)
  }, [selected])

  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    if(visited){
      setTimeout(() => {
        window.addEventListener('keydown', keydown)
      }, 500);
    }
    return () => window.removeEventListener('keydown', keydown);
  }, [visited])
  return { src, isHide, selected }
}