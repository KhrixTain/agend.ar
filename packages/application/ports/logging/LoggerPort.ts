export interface LoggerPort {
  info(msg: string, meta?: any): void;
  error(msg: string | Error, meta?: any): void;
  child(meta: Record<string, any>): LoggerPort; // opcional
}