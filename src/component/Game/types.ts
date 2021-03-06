export enum MoveType {
  top = 87,
  left = 65,
  down = 83,
  right = 68,
  turnLeft = 74,
  turnRight = 75,
  fire = 32,
}

export enum Result {
  play = 'play',
  success = 'success',
  fail = 'fail',
}

export interface Size {
  width: number, height: number
}

export interface Props {
  toMenu: Function;
  sceneRef: React.MutableRefObject<number>;
}