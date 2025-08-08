import pino from "pino";
import type { LoggerPort } from "@application/ports/logging/LoggerPort.js";

export class PinoLogger implements LoggerPort {
  constructor(private readonly logger = pino()) {}
  info(msg: string, meta?: any) { this.logger.info(meta ?? {}, msg); }
  error(msg: string | Error, meta?: any) {
    if (msg instanceof Error) this.logger.error({ err: msg, ...(meta ?? {}) }, msg.message);
    else this.logger.error(meta ?? {}, msg);
  }
  child(meta: Record<string, any>): LoggerPort {
    return new PinoLogger(this.logger.child(meta));
  }
}
