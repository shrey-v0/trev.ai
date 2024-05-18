import { and, eq, or } from "@trev/db";
import { events } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const incidentsRouter = createTRPCRouter({
  getAllIncidentsInTeamspace: protectedProcedure.query(async (opts) => {
    const getAllIncidents = await opts.ctx.db
      .select()
      .from(events)
      .where(
        and(
          or(
            eq(events.event_type, "IncidentAlerts"),
            eq(events.event_type, "IncidentsResolved"),
            eq(events.event_type, "IncidentsAck"),
          ),
          eq(events.teamspace_id, opts.ctx.teamspace.id),
        ),
      );

    const batchSize = 3;
    const batches = [];

    for (let i = 0; i < getAllIncidents.length; i += batchSize) {
      const batch = getAllIncidents.slice(i, i + batchSize);

      batches.push({
        incident: "incident#" + batch[0].id,
        startedAt: batch[0].timestamp,
        acknowledgedAt: batch[1].timestamp,
        resolvedAt: batch[2].timestamp,
      });
    }

    return batches;
  }),
});



export type Incident = {
  incident: string;
  startedAt: Date;
  acknowledgedAt: Date;
  resolvedAt: Date;
};
