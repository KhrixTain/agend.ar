export interface ConfigPort {
  get(key: string, fallback?: string): string | undefined;
  getNumber(key: string, fallback?: number): number | undefined;
  require(key: string): string;
}
