import { and, eq, gte, sql } from "@trev/db";
import { aggregatedEvents, events } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const aggregatedEventsRouter = createTRPCRouter({
  getDeploymentFrequency: protectedProcedure.query(async (opts) => {
    const dailyDeployments = await opts.ctx.db
      .select({
        date: aggregatedEvents.date,
        event_type: aggregatedEvents.event_type,
        value: aggregatedEvents.value,
      })
      .from(aggregatedEvents)
      .where(
        and(
          eq(aggregatedEvents.event_type, "PRMerged"),
          gte(aggregatedEvents.date, sql`now() - interval '7 days'`),
        ),
      );

    const totalDeployments = dailyDeployments.reduce(
      (acc, curr) => acc + (curr.value || 0),
      0,
    );

    const deploymentFrequency = totalDeployments / 7;

    return {
      dailyDeployments,
      deploymentFrequency,
    };
  }),
});
