export function withSeparator(x: number, decimals?: number): string {
  return Intl.NumberFormat('es', { maximumFractionDigits: decimals || 0 }).format(x);
}

export function thousandsAsK(x: number, decimals?: number): string {
  return x > 1000 ? `${(x / 1000).toFixed(decimals || 0)}K` : x.toFixed(decimals || 0);
}
