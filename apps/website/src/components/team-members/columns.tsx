"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Flame } from "lucide-react";

import type { Activities } from "@trev/api/src/router";
import type { TEventType, TUser } from "@trev/db/src/schema";
import { Popover, PopoverContent, PopoverTrigger } from "@trev/ui";

import type { Merge } from "@/lib/utils";
import { capitalize } from "@/lib/utils";
import SimpleDonutWrapper from "../charts/simple-dounut-wrapper";

export const columns: ColumnDef<Merge<TUser, Activities>>[] = [
  {
    accessorKey: "email",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[125px] flex-row items-center gap-2 truncate group-hover:underline">
          {capitalize(row.original.email.split("@")[0])}
          <Popover>
            <PopoverTrigger>
              {Number(row.original.commits) > 300 && (
                <Flame className="mr-1 h-4 w-4 cursor-pointer" fill="orange" />
              )}
            </PopoverTrigger>
            <PopoverContent className="max-w-fit">
              <p className="text-sm">Burned Out</p>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const { email } = row.original;
      return <span className="text-muted-foreground">{email}</span>;
    },
  },
  {
    accessorKey: "pr_activty",
    header: "PR Activity",
    cell: ({ row }) => {
      const { propen, commits, prcomments, prreviewed, prmerged } =
        row.original;

      const data = [
        { activity_type: "PROpen", events: Number(propen) ?? 0 },
        { activity_type: "PRMerged", events: Number(prmerged) ?? 0 },
        { activity_type: "PRReviewed", events: Number(prreviewed) ?? 0 },
        { activity_type: "PRComments", events: Number(prcomments) ?? 0 },
        { activity_type: "Commits", events: Number(commits) ?? 0 },
      ] as {
        activity_type: TEventType;
        events: number;
      }[];

      return <SimpleDonutWrapper data={data} category={"events"} />;
    },
  },
  {
    accessorKey: "incident_alert",
    header: "Incident Alerts",
    cell: ({ row }) => {
      const { incidentalerts } = row.original;
      return <span>{incidentalerts}</span>;
    },
  },
  {
    header: "incident_resolved",
    cell: ({ row }) => {
      const { incidentsresolved } = row.original;
      return <span>{incidentsresolved}</span>;
    },
  },
];
