import { and, eq, gte, or, sql } from "@trev/db";
import { aggregatedEvents, events } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cycleMetricsRouter = createTRPCRouter({
  getCodingTime: protectedProcedure.query(async (opts) => {
    const codingTimeThisWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ coding_time: string }>
    >`SELECT
    AVG(difference / 86400.0) AS "coding_time"
  FROM
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'Commits'
        AND e2."event_type" = 'PROpen'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;
  `);

    const codingTimeLastWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ coding_time: string }>
    >`SELECT
    AVG(difference / 86400.0) AS "coding_time"
  FROM
      
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'Commits'
        AND e2."event_type" = 'PROpen'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '14 days'
    ) AS subquery;
  `);

    return {
      codingTimeThisWeek: codingTimeThisWeek.rows[0] as {
        coding_time: string;
      },
      delta:
        (Number(codingTimeLastWeek.rows[0].coding_time) -
          Number(codingTimeThisWeek.rows[0].coding_time)) *
        100,
    };
  }),

  getPickupTime: protectedProcedure.query(async (opts) => {
    const pickupTimeThisWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ pickup_time: string }>
    >`SELECT
    AVG(difference / 86400.0) AS "pickup_time"
  FROM
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'PROpen'
        AND e2."event_type" = 'PRReviewed'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;
  `);

    const pickupTimeLastWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ pickup_time: string }[]>
    >`SELECT
    AVG(difference / 86400.0) AS "pickup_time"
  FROM
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'PROpen'
        AND e2."event_type" = 'PRReviewed'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '14 days'
    ) AS subquery;
  `);

    return {
      pickupTimeThisWeek: pickupTimeThisWeek.rows[0] as {
        pickup_time: string;
      },
      delta:
        Number(pickupTimeLastWeek.rows[0].pickup_time) -
        Number(pickupTimeThisWeek.rows[0].pickup_time),
    };
  }),

  getMergeTime: protectedProcedure.query(async (opts) => {
    const mergeTimeThisWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ merge_time: string }>
    >`SELECT
    AVG(difference / 86400.0) AS "merge_time"
  FROM
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'PRMerged'
        AND e2."event_type" = 'PRReviewed'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;
  `);

    const mergeTimeLastWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ merge_time: string }>
    >`SELECT
  AVG(difference / 86400.0) AS "merge_time"
FROM
  (
    SELECT
      ABS(
        EXTRACT(
          EPOCH
          FROM
            (e1."timestamp" - e2."timestamp")
        )
      ) AS difference
    FROM
      ${events} e1
      JOIN ${events} e2 ON e1."key" = e2."key"
      AND e1."event_type" = 'PRMerged'
      AND e2."event_type" = 'PRReviewed'
    WHERE
      e1."timestamp" >= NOW() - INTERVAL '14 days'
  ) AS subquery;
`);

    return {
      mergeTimeThisWeek: mergeTimeThisWeek.rows[0] as {
        merge_time: string;
      },
      delta:
        Number(mergeTimeLastWeek.rows[0].merge_time) -
        Number(mergeTimeThisWeek.rows[0].merge_time),
    };
  }),

  getCycleTime: protectedProcedure.query(async (opts) => {
    const cycleTimeThisWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ cycle_time: string }>
    >`SELECT
    AVG(difference / 86400.0) AS "cycle_time"
  FROM
    (
      SELECT
        ABS(
          EXTRACT(
            EPOCH
            FROM
              (e1."timestamp" - e2."timestamp")
          )
        ) AS difference
      FROM
        ${events} e1
        JOIN ${events} e2 ON e1."key" = e2."key"
        AND e1."event_type" = 'PRMerged'
        AND e2."event_type" = 'PROpen'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;
  `);

    const cycleTimeLastWeek = await opts.ctx.db.execute(sql<
      NeonResponse<{ cycle_time: string }>
    >`SELECT
  AVG(difference / 86400.0) AS "cycle_time"
FROM
  (
    SELECT
      ABS(
        EXTRACT(
          EPOCH
          FROM
            (e1."timestamp" - e2."timestamp")
        )
      ) AS difference
    FROM
      ${events} e1
      JOIN ${events} e2 ON e1."key" = e2."key"
      AND e1."event_type" = 'PRMerged'
      AND e2."event_type" = 'PROpen'
    WHERE
      e1."timestamp" >= NOW() - INTERVAL '14 days'
  ) AS subquery;
`);
    return {
      cycleTimeThisWeek: cycleTimeThisWeek.rows[0] as {
        cycle_time: string;
      },
      delta:
        Number(cycleTimeLastWeek.rows[0].cycle_time) -
        Number(cycleTimeThisWeek.rows[0].cycle_time),
    };
  }),

  getPRMergeCount: protectedProcedure.query(async (opts) => {
    const prMergeCount = await opts.ctx.db
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
      )
      .groupBy(
        aggregatedEvents.date,
        aggregatedEvents.event_type,
        aggregatedEvents.value,
      );

    const totalPR = await opts.ctx.db
      .select({
        value: aggregatedEvents.value,
      })
      .from(aggregatedEvents)
      .where(
        and(
          eq(aggregatedEvents.event_type, "PROpen"),
          gte(aggregatedEvents.date, sql`now() - interval '7W days'`),
        ),
      )
      .groupBy(aggregatedEvents.value);

    const aggregatePRMergeEvents = (events: PRMergeEvent[]) => {
      return events.reduce(
        (acc, event) => {
          if (event.value === null) return acc;

          const dateString = event.date.toISOString().split("T")[0];
          if (!acc[dateString]) {
            acc[dateString] = {
              date: new Date(dateString),
              event_type: event.event_type,
              value: 0,
            };
          }
          acc[dateString].value! += event.value;

          return acc;
        },
        {} as Record<string, PRMergeEvent>,
      );
    };
    const aggregatedData = Object.values(aggregatePRMergeEvents(prMergeCount));

    const totalMergesThisWeek = aggregatedData.reduce(
      (acc, curr) => acc + (curr.value || 0),
      0,
    );

    const totalPRCount = totalPR.reduce(
      (acc, curr) => acc + (curr.value || 0),
      0,
    );

    return {
      prMergeData: aggregatedData,
      avgMergeCount: (totalMergesThisWeek / totalPRCount) * 100,
    };
  }),
});

interface NeonResponse<Row> {
  command: string;
  fields: any[];
  rowAsArray: boolean;
  rowCount: number;
  rows: Row;
  viaNeonFetch: boolean;
}

export interface PRMergeEvent {
  date: Date;
  event_type: string | null;
  value: number | null;
}
