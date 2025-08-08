import Fastify from "fastify";
import type { HttpServerPort, HttpHandler, HttpMethod } from "@application/ports/http/HttpServerPort.js";

export class FastifyHttpServer implements HttpServerPort {
  private readonly app = Fastify({ logger: false });

  route(method: HttpMethod, path: string, handler: HttpHandler): void {
    this.app.route({
      method,
      url: path,
      handler: async (req, reply) => {
        const res = await handler({
          params: (req.params as any) ?? {},
          query: (req.query as any) ?? {},
          headers: req.headers as Record<string, string>,
          body: req.body,
        });
        if (res.headers) reply.headers(res.headers);
        return reply.code(res.status).send(res.body ?? null);
      },
    });
  }

  async start(opts: { port: number; host?: string }): Promise<void> {
    await this.app.listen({ port: opts.port, host: opts.host ?? "0.0.0.0" });
  }

  async stop(): Promise<void> {
    await this.app.close();
  }
}
