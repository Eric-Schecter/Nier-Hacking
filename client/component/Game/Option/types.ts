export interface Props {
  title: string,
  op1: Op,
  op2: Op,
}

interface Op {
  key: string;
  text: string;
}