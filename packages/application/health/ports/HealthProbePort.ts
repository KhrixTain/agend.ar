export type HealthCheck = {
  name: string;
  ok: boolean;
  details?: Record<string, unknown>;
};

export interface HealthProbePort {
  check(): Promise<HealthCheck>;
}
