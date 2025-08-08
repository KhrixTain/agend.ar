import * as dotenv from "dotenv";
dotenv.config();

export class DotenvConfig {
  get(key: string, fallback?: string) {
    return process.env[key] ?? fallback;
  }
  getNumber(key: string, fallback?: number) {
    const v = process.env[key];
    return v !== undefined ? Number(v) : fallback;
  }
  require(key: string) {
    const v = process.env[key];
    if (!v) throw new Error(`Missing required config: ${key}`);
    return v;
  }
}
