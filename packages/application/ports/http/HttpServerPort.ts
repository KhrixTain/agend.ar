export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type HttpHandler = (ctx: {
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  headers: Record<string, string>;
  body?: unknown;
}) => Promise<{ status: number; body?: unknown; headers?: Record<string, string> }>;

export interface HttpServerPort {
  route(method: HttpMethod, path: string, handler: HttpHandler): void;
  start(opts: { port: number; host?: string }): Promise<void>;
  stop(): Promise<void>;
}
