const BASE: string = import.meta.env.BASE_URL.replace(/\/$/, '');

export function sitePath(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Site paths must start with "/": ${path}`);
  return `${BASE}${path}`;
}
