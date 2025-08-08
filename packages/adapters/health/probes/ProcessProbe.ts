import type { HealthProbePort, HealthCheck } from "@application/health/ports/HealthProbePort.ts";

export class ProcessProbe implements HealthProbePort {
  async check(): Promise<HealthCheck> {
    return {
      name: "process",
      ok: true,
      details: {
        memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
        pid: process.pid,
      },
    };
    }
}
