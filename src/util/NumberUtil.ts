export function withSeparator(x: number, decimals?: number): string {
  return Intl.NumberFormat('es', { maximumFractionDigits: decimals || 0 }).format(x);
}

export function thousandsAsK(x: number, decimals?: number): string {
  return `${(x / 1000).toFixed(0)}K`;
}
