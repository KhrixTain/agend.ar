import type { HealthProbePort, HealthCheck } from "../ports/HealthProbePort.ts";

export type CheckReadinessResult = {
  ok: boolean;
  checks: HealthCheck[];
};

export class CheckReadiness {
  constructor(private readonly probes: HealthProbePort[]) {}

  async execute(): Promise<CheckReadinessResult> {
    const checks = await Promise.all(this.probes.map((p) => p.check()));
    const ok = checks.every((c) => c.ok);
    return { ok, checks };
  }
}
