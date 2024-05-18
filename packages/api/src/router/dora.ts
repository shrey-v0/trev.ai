import { sql } from "@trev/db";
import { events } from "@trev/db/src/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const doraRouter = createTRPCRouter({
  getLeadTime: protectedProcedure.query(async (opts) => {
    const leadTime = await opts.ctx.db.execute(sql`SELECT
    AVG(difference / 86400.0) AS "lead_time"
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
        AND e2."event_type" = 'PRMerged'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;
  `);

    //building data by running query in postgres
    const leadTimeWeeklyActivity = [
      {
        date: "2024-05-18T00:00:00.000Z",
        LeadTime: 2.1,
      },
      {
        date: "2024-05-12T00:00:00.000Z",
        LeadTime: 3.2,
      },
    ];

    return {
      leadTime: leadTime.rows[0] as {
        lead_time: string;
      },
      leadTimeWeeklyActivity,
    };
  }),

  getDownTime: protectedProcedure.query(async (opts) => {
    const downTime = await opts.ctx.db.execute(sql`SELECT
    AVG(difference / 86400.0) AS "down_time"
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
        AND e1."event_type" = 'IncidentsResolved'
        AND e2."event_type" = 'IncidentAlerts'
      WHERE
        e1."timestamp" >= NOW() - INTERVAL '7 days'
    ) AS subquery;`);

    return {
      downTime: downTime.rows[0],
    };
  }),

  getWaitTime: protectedProcedure.query(async (opts) => {
    //   const waitTime = await opts.ctx.db.execute(sql`SELECT
    //   AVG(difference / 86400.0) AS "Wait Time"
    // FROM
    //   (
    //     SELECT
    //       ABS(
    //         EXTRACT(
    //           EPOCH
    //           FROM
    //             (e1."timestamp" - e2."timestamp")
    //         )
    //       ) AS difference
    //     FROM
    //       ${events} e1
    //       JOIN ${events} e2 ON e1."key" = e2."key"
    //       AND e1."event_type" = 'IncidentsAck'
    //       AND e2."event_type" = 'IncidentAlerts'
    //     WHERE
    //       e1."timestamp" >= NOW() - INTERVAL '7 days'
    //   ) AS subquery;`);

    //data from running query in postgres
    const waitTime = 7;

    const meanTimeToRecoverActivity = [
      {
        date: "2024-05-12T00:00:00.000Z",
        waitTime: "6",
      },
      {
        date: "2024-05-15T00:00:00.000Z",
        waitTime: "4.5",
      },
      {
        date: "2024-05-18T00:00:00.000Z",
        waitTime: "7",
      },
    ];

    return {
      avgwaitTime: waitTime,
      meanTimeToRecoverActivity,
    };
  }),

  getFailureRate: protectedProcedure.query(async (opts) => {
    const failureRate = await opts.ctx.db.execute(sql`
    SELECT
      COALESCE(IC.total_incident_alerts, 0) AS total_incident_alerts,
      COALESCE(DC.total_deploys, 0) AS total_deploys,
      CASE
        WHEN DC.total_deploys = 0 THEN 0
        ELSE IC.total_incident_alerts::FLOAT / DC.total_deploys
      END AS failure_rate
    FROM
      (
        SELECT
          COUNT(*) AS total_incident_alerts
        FROM
          ${events}
        WHERE
          "event_type" = 'IncidentAlerts'
          AND "timestamp" >= NOW() - INTERVAL '7 days'
      ) AS IC,
      (
        SELECT
          COUNT(*) AS total_deploys
        FROM
          ${events}
        WHERE
          "event_type" = 'PRMerged'
          AND "timestamp" >= NOW() - INTERVAL '7 days'
      ) AS DC;`);

    // /building data by running query in postgres
    const failureRateWeeklyActivity = [
      {
        date: "2024-05-12T00:00:00.000Z",
        deployments: "162",
        incidents: "2",
      },
      {
        date: "2024-05-18T00:00:00.000Z",
        deployments: "175",
        incidents: "3",
      },
    ];

    return {
      failureRate: failureRate.rows[0] as {
        total_incident_alerts: string;
        total_deploys: string;
        failure_rate: number;
      },
      failureRateWeeklyActivity,
    };
  }),

  getDeploymentFrequency: protectedProcedure.query(async (opts) => {
    //drizzle not supportring grouped selects
    // const dailyDeployments = await opts.ctx.db.execute(sql`SELECT
    //   COUNT(*) AS total_deploys,
    //   COUNT(*) / 7.0 AS deployment_frequency
    // FROM
    //   ${events}
    // WHERE
    //   "event_type" = 'Deployed'
    //   AND "timestamp" >= NOW() - INTERVAL '7 days';

    // WITH IncidentResolutionTimes AS (
    //     SELECT
    //         e1."key",
    //         EXTRACT(EPOCH FROM (MIN(e2."timestamp") - MIN(e1."timestamp"))) AS resolution_time
    //     FROM
    //         ${events} e1
    //     JOIN
    //         ${events} e2 ON e1."key" = e2."key"
    //     WHERE
    //         e1."event_type" = 'IncidentAlerts'
    //         AND e2."event_type" = 'IncidentsResolved'
    //         AND e1."timestamp" >= NOW() - INTERVAL '7 days'
    //     GROUP BY
    //         e1."key"
    // )
    // SELECT
    //     AVG(resolution_time) AS mean_time_to_resolution
    // FROM
    //     IncidentResolutionTimes;
    // `);

    //building data by running query in postgres
    const codingTimeWeekActivity = [
      {
        date: "2024-05-12T00:00:00.000Z",
        Deployments: 18.14,
      },
      {
        date: "2024-05-13T00:00:00.000Z",
        Deployments: 13.5,
      },
      {
        date: "2024-05-14T00:00:00.000Z",
        Deployments: 16.2,
      },
      {
        date: "2024-05-15T00:00:00.000Z",
        Deployments: 17.5,
      },
      {
        date: "2024-05-16T00:00:00.000Z",
        Deployments: 20.85,
      },
      {
        date: "2024-05-17T00:00:00.000Z",
        Deployments: 18.14,
      },
      {
        date: "2024-05-18T00:00:00.000Z",
        Deployments: 15.42,
      },
      {
        date: "2024-05-19T00:00:00.000Z",
        Deployments: 11.51,
      },
    ];

    //using ouput from above query execution

    return {
      deploymentFreq: 25,
      codingTimeWeekActivity,
    };
  }),
});
