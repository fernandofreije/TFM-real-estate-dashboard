export function withSeparator(x: number, decimals?: number): string {
  return x
    .toFixed(decimals)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
