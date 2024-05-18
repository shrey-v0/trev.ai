import { relations } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { EventTypes } from "./enums";
import { eventMeta } from "./event_meta";
import { teamspace } from "./teamspace";
import { user } from "./user";

export const aggregatedEvents = pgTable("AggregatedEvents", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id").references(() => user.id),
  teamspace_id: integer("teamspace_id").references(() => teamspace.id),
  value: integer("value"),
  event_type: EventTypes("event_type").references(() => eventMeta.event_type),
  date: timestamp("date").notNull().defaultNow(),
});

export const aggregatedEventsRelations = relations(
  aggregatedEvents,
  ({ one }) => ({
    user: one(user, {
      fields: [aggregatedEvents.user_id],
      references: [user.id],
    }),
    teamspace: one(teamspace, {
      fields: [aggregatedEvents.teamspace_id],
      references: [teamspace.id],
    }),
    EventMeta: one(eventMeta, {
      fields: [aggregatedEvents.event_type],
      references: [eventMeta.event_type],
    }),
  }),
);

export const insertAggregatedEventsSchema =
  createInsertSchema(aggregatedEvents);

export const selectAggregatedEventSchema = createSelectSchema(aggregatedEvents);

export type TAggregatedEvents = z.infer<typeof selectAggregatedEventSchema>;

export type TInsertAggregatedEvents = z.infer<
  typeof insertAggregatedEventsSchema
>;
