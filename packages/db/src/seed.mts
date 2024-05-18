import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "../env.mjs";
import events from "./extras/events.json";
import parsedredis from "./extras/parsedredis.json";
import * as schema from "./schema";

// rishi@devdynamics.ai, ritik@devdynamics.ai, avijit@devdynamics.ai, arvind.shelke@devdynamics.ai

async function main() {
  const sql = neon(env.DRIZZLE_DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log("Seeding database");

  await db.insert(schema.tenant).values([
    {
      name: "devdynamics",
    },
  ]);

  await db.insert(schema.teamspace).values([
    {
      name: "frontend",
      tenant_id: 1,
    },
  ]);

  await db.insert(schema.user).values([
    {
      id: 1,
      teamspace_id: 1,
      email: "rishi@devdynamics.ai",
      user_type: "Engineer",
    },
    {
      id: 2,
      teamspace_id: 1,
      email: "ritik@devdynamics.ai",
      user_type: "Engineer",
    },
    {
      id: 3,
      teamspace_id: 1,
      email: "avijit@devdynamics.ai",
      user_type: "Engineer",
    },
    {
      id: 4,
      teamspace_id: 1,
      email: "arvind.shelke@devdynamics.ai",
      user_type: "Engineer",
    },
  ]);

  await db.insert(schema.eventMeta).values([
    {
      teamspace_id: 1,
      event_type: "PROpen",
      fill_color: "#EF6B6B",
      label: "PR Open",
    },
    {
      teamspace_id: 1,
      event_type: "PRMerged",
      label: "PR Merged",
      fill_color: "#61CDBB",
    },
    {
      teamspace_id: 1,
      event_type: "Commits",
      label: "Commits",
      fill_color: "#FAC76E",
    },
    {
      teamspace_id: 1,
      event_type: "PRReviewed",
      label: "PR Reviewed",
      fill_color: "#C2528B",
    },
    {
      teamspace_id: 1,
      event_type: "PRComments",
      label: "PR Comments",
      fill_color: "#0396A6",
    },
    {
      teamspace_id: 1,
      event_type: "IncidentAlerts",
      label: "Incident Alerts",
      fill_color: "#5F50A9",
    },
    {
      teamspace_id: 1,
      event_type: "IncidentsResolved",
      label: "Incidents Resolved",
      fill_color: "#8F3519",
    },
    {
      teamspace_id: 1,
      event_type: "IncidentsAck",
      label: "Incidents Acknoledged",
      fill_color: "#8F3519",
    },
  ]);

  //one value per id for commit
  await db.insert(schema.events).values(
    events.map((event) => ({
      key: event.key,
      event_type: event.event_type as any, //just to insert
      user_type: event.user_type,
      teamspace_id: 1,
      user_id: event.user_id,
      timestamp: new Date(event.timestamp),
    })),
  );

  await db.insert(schema.aggregatedEvents).values(
    parsedredis.map((event) => ({
      user_id: event.user_id,
      teamspace_id: Number(event.teamspace_id),
      value: event.value,
      event_type: event.event_type as any, //just to insert
      date: new Date(event.date),
    })),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
