import { FastifyHttpServer } from "@adapters/http-fastify/FastifyHttpServer";
import { DotenvConfig } from "@adapters/config-dotenv/DotenvConfig";
import { PinoLogger } from "@adapters/logger-pino/PinoLogger";
import { registerHealthHttp } from "@application/health/registerHealthHttp";
import { ProcessProbe } from "@adapters/health/probes/ProcessProbe";

async function bootstrap() {
  // Adapters concretos (reemplazables)
  const config = new DotenvConfig();
  const logger = new PinoLogger();

  const http = new FastifyHttpServer();

  // Probes (agregá Postgres/Redis cuando toque)
  const probes = [ new ProcessProbe() ];

  // Rutas “agnósticas”
  registerHealthHttp(http, {
    probes,
    version: config.get("APP_VERSION", "0.1.0")!,
    commit: config.get("GIT_COMMIT", "dev")!,
  });

  const port = config.getNumber("PORT", 3000)!;
  await http.start({ port, host: "0.0.0.0" });
  logger.info(`HTTP up on :${port}`);
}

bootstrap().catch((err) => {
  // último recurso: no dependas del logger si falló wiring
  console.error(err);
  process.exit(1);
});
