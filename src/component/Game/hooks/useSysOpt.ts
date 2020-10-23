import { useEffect, useState, useRef } from 'react';
import { State } from '../reducer';
import { delay } from '../../../functions/delay';
import { SysOpt } from '../../../types';
import { Result } from '../types';
import { useGetContext } from '../../Home/Home';
import data from '../../../data/map';
import { sounds } from '../../../sounds';

export const useSysOpt = (state: State, toMenu: Function, sceneRef: React.MutableRefObject<number>,
  result: string, setRefresh: Function, setResult: Function,
  isEndRef: React.MutableRefObject<boolean>, setChangeScene: Function, visited: boolean, setVisited: Function,
) => {
  const audioRef = useGetContext();
  const [isHide, setIsHide] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  useEffect(() => {
    const hide = async (e: KeyboardEvent) => {
      if (e.keyCode === SysOpt.return) {
        setIsHide(true);
        audioRef.current?.play(sounds.return.src);
        await delay(1000);
        toMenu();
      }
    }
    state.isPause || result === Result.success
      ? window.addEventListener('keydown', hide)
      : window.removeEventListener('keydown', hide);
    return () => window.removeEventListener('keydown', hide);
  }, [state.isPause, visited, result, audioRef, toMenu])

  useEffect(() => {
    const hide = async (e: KeyboardEvent) => {
      if (e.keyCode === SysOpt.pause) {
        setIsHiding(true);
        await delay(500);
        setVisited(true);
      }
    }
    !visited
      ? window.addEventListener('keydown', hide)
      : window.removeEventListener('keydown', hide);
    return () => window.removeEventListener('keydown', hide);
  }, [visited,setVisited])

  const preResult = useRef('');
  useEffect(() => {
    let isLocked = false;
    const restart = async (e: KeyboardEvent) => {
      if (e.keyCode === SysOpt.space) {
        if (isLocked) { return; }
        isLocked = true;
        sceneRef.current === data.length - 1
          ? sceneRef.current = 0
          : sceneRef.current++;
        setChangeScene(true);
        audioRef.current?.play(sounds.changeScene.src);
        await delay(500);
        setRefresh((pre: boolean) => !pre);
        setResult(Result.play);
        await delay(1000);
        setChangeScene(false);
        isEndRef.current = false;
        isLocked = false;
      }
    }
    if (preResult.current !== result) {
      result === Result.success
        ? setTimeout(() => {
          window.addEventListener('keydown', restart)
        }, 500)
        : window.removeEventListener('keydown', restart);
    }
    return () => window.removeEventListener('keydown', restart);
  }, [result,audioRef,isEndRef,sceneRef,setChangeScene,setRefresh,setResult])

  useEffect(() => {
    const restart = async () => {
      await delay(500);
      setChangeScene(true);
      audioRef.current?.play(sounds.changeScene.src);
      await delay(500);
      setRefresh((pre: boolean) => !pre);
      setResult(Result.play);
      await delay(1000);
      setChangeScene(false);
      isEndRef.current = false;
    }
    result === Result.fail && restart()
  }, [result,audioRef,isEndRef,setChangeScene,setRefresh,setResult])

  return { isHide, isHiding }
}