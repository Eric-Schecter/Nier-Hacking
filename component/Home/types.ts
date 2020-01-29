export interface Props {
  debut: boolean;
  showMessage: Function;
  updateLoginRequire: Function;
  chatData: object[];
}

export interface Message {
  type: string;
  content: string;
}

export interface IssueFunState {
  isCreate: boolean,
  isDelete: boolean,
}

export interface FilterState {
  [propName: string]: Array<string> | undefined;
}

interface Data {
  type: string,
  content: string,
  active: boolean,
  event: () => void,
}

export interface Dispatch {
  type: string,
  payload?: Array<string>,
}

type Reducer<S> = (state: S, action: Dispatch) => S

type ReducerIssue = Reducer<IssueFunState>
type ReducerFilter = Reducer<FilterState>

export interface ReduxFilter {
  initState: FilterState,
  reducer: ReducerFilter,
}
export interface ReduxIssue {
  initState: IssueFunState,
  reducer: ReducerIssue,
  data: Array<Data>,
}