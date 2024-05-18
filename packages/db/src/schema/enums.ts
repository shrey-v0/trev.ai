import { pgEnum } from "drizzle-orm/pg-core";

export const eventsArr = [
  "PROpen",
  "PRComments",
  "PRReviewed",
  "PRMerged",
  "Commits",
  "IncidentAlerts",
  "IncidentsAck",
  "IncidentsResolved",
] as const;

export const UserType = pgEnum("user_type", ["Engineer", "Manager"]);

export const EventTypes = pgEnum("event_type", [...eventsArr]);

export type TEventType = (typeof eventsArr)[number];
