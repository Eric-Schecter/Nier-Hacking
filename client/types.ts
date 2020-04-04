declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    AudioContext: any;
    webkitAudioContext: any;
  }
}

export { }

export enum SysOpt {
  pause = 80,
  return = 82,
  space = 32,
}

export enum Direction{
  top = 87,
  left = 65,
  down = 83,
  right = 68,
}