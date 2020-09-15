export const slow = (target: any): Function => {
  return class extends target {
    protected speed = 3;
  }
}