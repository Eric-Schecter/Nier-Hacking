export interface State {
  pos: {
    x: number;
    y: number;
  }
  angle: number;
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
    angle: 0
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
        return { pos: { x: 0, y: 0 }, angle: 0 };
      case 'turnLeft':
        return { ...state, angle: -1 };
      case 'turnRight':
        return { ...state, angle: 1 };
      default:
        return state;
    }
  },
};

export { drawReducer };