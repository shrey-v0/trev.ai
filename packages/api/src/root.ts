import {
  aggregatedEventsRouter,
  cycleMetricsRouter,
  doraRouter,
  incidentsRouter,
  teamspaceRouter,
  tenantRouter,
  userRouter,
} from "./router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  tenant: tenantRouter,
  teamspace: teamspaceRouter,
  user: userRouter,
  dora: doraRouter,
  cycleMetrics: cycleMetricsRouter,
  incidents: incidentsRouter,
  aggregatedEvents: aggregatedEventsRouter,
});
export type AppRouter = typeof appRouter;
