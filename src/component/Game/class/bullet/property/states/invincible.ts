export const invincible = (target: any): Function => {
  return class extends target {
    protected color =  [64, 10, 105];
    protected canDefect = false;
  }
}