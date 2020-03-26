export interface State {
  pos: {
    x: number;
    y: number;
  }
  angle: number;
  fire: boolean;
  isPause: boolean;
}

export interface Action {
  // type: 'top' | 'down' | 'left' | 'right' | 'init' | 'turnLeft' | 'turnRight';
  type: string,
}

const drawReducer = {
  initState: {
    pos: {
      x: 0,
      y: 0,
    },
    angle: 0,
    fire: false,
    isPause: false,
  },
  reducer: (state: State, action: Action) => {
    switch (action.type) {
      case 'top':
        return { ...state, pos: { ...state.pos, y: -1 } };
      case 'down':
        return { ...state, pos: { ...state.pos, y: 1 } };
      case 'left':
        return { ...state, pos: { ...state.pos, x: -1 } };
      case 'right':
        return { ...state, pos: { ...state.pos, x: 1 } };
      case 'init':
        return { ...state, pos: { x: 0, y: 0 }, angle: 0, fire: false };
      case 'turnLeft':
        return { ...state, angle: -1 };
      case 'turnRight':
        return { ...state, angle: 1 };
      case 'fire':
        return { ...state, fire: !state.fire };
      case 'isPause':
        return { ...state, isPause: !state.isPause };
      default:
        return state;
    }
  },
};

export { drawReducer };