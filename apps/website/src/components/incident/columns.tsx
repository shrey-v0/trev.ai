"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { formatDistanceStrict } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import type { Incident } from "@trev/api/src/router";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@trev/ui";

import { capitalize, cn, formatDateTime } from "@/lib/utils";

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "incident",
    header: "Incident",
    cell: ({ row }) => {
      return (
        <span className="max-w-[125px] truncate group-hover:underline">
          {capitalize(row.original.incident)}
        </span>
      );
    },
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    cell: ({ row }) => {
      const { startedAt } = row.original;
      const date = startedAt ? formatDateTime(startedAt) : "-";
      return (
        <div className="flex gap-2">
          <span className="text-muted-foreground max-w-[150px] truncate sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">
            {date}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "acknowledgedAt",
    header: "Acknowledged At",
    cell: ({ row }) => {
      const { acknowledgedAt } = row.original;
      const date = acknowledgedAt ? formatDateTime(acknowledgedAt) : "-";
      return (
        <div className="flex">
          <span className="text-muted-foreground max-w-[150px] truncate sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">
            {date}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "resolvedAt",
    header: "Resolved At",
    cell: ({ row }) => {
      const { resolvedAt } = row.original;
      const date = resolvedAt ? formatDateTime(resolvedAt) : "-";
      return (
        <div className="flex gap-2">
          <span className="text-muted-foreground max-w-[150px] truncate sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">
            {date}
          </span>
        </div>
      );
    },
  },
  {
    header: "Duration",
    cell: ({ row }) => {
      const { startedAt, resolvedAt } = row.original;

      if (!resolvedAt) {
        return <span className="text-muted-foreground">-</span>;
      }

      const duration = formatDistanceStrict(
        new Date(startedAt),
        new Date(resolvedAt),
      );

      return (
        <div className="flex">
          <span
            className={cn(
              "text-muted-foreground max-w-[150px] truncate sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]",
              {
                "text-green-600 dark:text-green-400":
                  Number(duration.split(" ")[0]) <= 2,
                "text-red-600 dark:text-red-400":
                  Number(duration.split(" ")[0]) >= 4,
                "dark::text-yellow-400 text-yellow-600":
                  Number(duration.split(" ")[0]) <= 3 &&
                  Number(duration.split(" ")[0]) > 2,
              },
            )}
          >
            {duration}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const incident = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled={incident.acknowledgedAt !== null}>
                Acknowledge
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={
                  incident.resolvedAt !== null ||
                  incident.acknowledgedAt === null
                }
              >
                Resolved
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
