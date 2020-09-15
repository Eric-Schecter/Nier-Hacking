export const shockwave = (target: any): Function => {
  return class extends target {
    protected color = [100, 100, 100]
  }
}