import { eq, sql } from "@trev/db";
import { aggregatedEvents, user } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUsersInCurrentTeamspace: protectedProcedure.query(async (opts) => {
    const currentTeam = await opts.ctx.db
      .select()
      .from(user)
      .where(eq(user.teamspace_id, opts.ctx.teamspace.id));

    const activities = await opts.ctx.db.execute(sql<NeonResponse>`SELECT
    ${aggregatedEvents.user_id},
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'IncidentsResolved' THEN VALUE
        ELSE 0
      END
    ) AS IncidentsResolved,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'IncidentAlerts' THEN VALUE
        ELSE 0
      END
    ) AS IncidentAlerts,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'Commits' THEN VALUE
        ELSE 0
      END
    ) AS Commits,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'PRMerged' THEN VALUE
        ELSE 0
      END
    ) AS PRMerged,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'PRReviewed' THEN VALUE
        ELSE 0
      END
    ) AS PRReviewed,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'PRComments' THEN VALUE
        ELSE 0
      END
    ) AS PRComments,
    SUM(
      CASE
        WHEN ${aggregatedEvents.event_type} = 'PROpen' THEN VALUE
        ELSE 0
      END
    ) AS PROpen
  FROM
    ${aggregatedEvents}
  WHERE
    ${aggregatedEvents.date} >= CURRENT_DATE - INTERVAL '14 days'
  GROUP BY
    ${aggregatedEvents.user_id}
  `);

    return {
      currentTeam,
      activities: activities.rows as any as Activities[],
    };
  }),
});

interface NeonResponse {
  command: string;
  fields: any[];
  rowAsArray: boolean;
  rowCount: number;
  rows: Activities[];
  viaNeonFetch: boolean;
}

export interface Activities {
  user_id: number;
  incidentsresolved: string;
  incidentalerts: string;
  commits: string;
  prmerged: string;
  prreviewed: string;
  prcomments: string;
  propen: string;
}
