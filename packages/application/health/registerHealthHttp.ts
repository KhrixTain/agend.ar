import type { HttpServerPort } from "@application/ports/http/HttpServerPort.ts";
import { CheckReadiness } from "./use-cases/CheckReadiness";
import type { HealthProbePort } from "./ports/HealthProbePort.ts";

export function registerHealthHttp(
  http: HttpServerPort,
  deps: { probes: HealthProbePort[]; version: string; commit: string }
) {
  http.route("GET", "/health/live", async () => ({
    status: 200,
    body: {
      status: "ok",
      probe: "live",
      uptimeSec: Math.round(process.uptime()),
      version: deps.version,
      commit: deps.commit,
    },
  }));

  const uc = new CheckReadiness(deps.probes);

  http.route("GET", "/health/ready", async () => {
    const res = await uc.execute();
    return {
      status: res.ok ? 200 : 503,
      body: {
        status: res.ok ? "ok" : "degraded",
        probe: "ready",
        checks: res.checks,
        uptimeSec: Math.round(process.uptime()),
        version: deps.version,
        commit: deps.commit,
      },
    };
  });
}
