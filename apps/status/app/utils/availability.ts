import { services } from "data";

export const isOperational = (() =>
  services.every((d) => d.status === "operational"))();
export const hasUnderMaintenanceService = (() =>
  services.some((d) => d.status === "maintenance"))();
export const hasDegradedService = (() =>
  services.some((d) => d.status === "degraded"))();
export const hasOutage = (() => services.some((d) => d.status === "outage"))();
