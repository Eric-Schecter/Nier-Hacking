import { useState, useEffect, useRef } from 'react';
import { MoveType, Result } from '../types';
import { SysOpt } from '../../../types';
import { State, Action } from '../reducer';
const keyArr = Object.values(MoveType).filter(d => typeof (d) === 'number');
const keyPairs = Object.entries(MoveType).filter(d => typeof (d[1]) === 'number');

export const useKeyBoard = (state: State, dispatch: React.Dispatch<Action>, result: string,
  isEndRef:React.MutableRefObject<boolean>,visited:boolean) => {
  const [downKeys, setDownKeys] = useState<Array<number>>([]);
  const downKeysRef = useRef<Array<number>>([]);
  const down = (e: KeyboardEvent) => {
    if ((state.isPause && e.keyCode !== SysOpt.pause) || result !== Result.play || isEndRef.current) {
      return;
    }
    if (e.keyCode === SysOpt.pause && !isEndRef.current) {
      dispatch({ type: 'isPause' });
    } else if (keyArr.some(d => d === e.keyCode) && !downKeysRef.current.some(d => d === e.keyCode)) {
      downKeysRef.current.push(e.keyCode)
      setDownKeys([...downKeysRef.current])
    }
  }
  const up = (e: any) => {
    if (e.keyCode === SysOpt.pause || state.isPause || result !== Result.play) { return; }
    const filtered = downKeysRef.current.filter(d => d !== e.keyCode);
    downKeysRef.current = filtered;
    setDownKeys(filtered)
  }
  useEffect(() => {
    if(visited){
      window.addEventListener('keydown', down);
      window.addEventListener('keyup', up);
    }

    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    }
  }, [visited])

  useEffect(() => {
    if (!downKeys.length || state.isPause || result !== Result.play) {
      dispatch({ type: 'init' });
      return;
    }
    const arr: Array<number> = [];
    const groupLR = [MoveType.left, MoveType.right];
    const groupTD = [MoveType.top, MoveType.down];
    const groupAngle = [MoveType.turnLeft, MoveType.turnRight];
    for (let i = downKeys.length - 1; i >= 0; i--) {
      if (!arr.some(d => downKeys[i] === d) ||
        !(groupLR.some(sd => downKeys[i] === sd)
          || groupTD.some(sd => downKeys[i] === sd)
          || groupAngle.some(sd => downKeys[i] === sd))) {
        arr.push(downKeys[i]);
      }
    }

    dispatch({ type: 'init' });
    arr.forEach(d => {
      keyPairs.forEach((sd) => sd[1] === d && dispatch({ type: sd[0] }))
    })
  }, [downKeys, state.isPause])
}