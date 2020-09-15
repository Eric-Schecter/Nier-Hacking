export const protection = (target: any):Function => {
  return class extends target {
    constructor(...args: Array<any>) {
      super(...args);
      this.setIsProtected = true;
    }
  }
}