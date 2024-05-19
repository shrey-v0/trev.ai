"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import type { TTeamspace } from "@trev/db/src/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@trev/ui";

export const SelectTeam = ({ teamspaces }: { teamspaces: TTeamspace[] }) => {
  const [active, setActive] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.split("/")?.[2] && teamspaces.length > 0) {
      setActive(pathname?.split("/")?.[2]);
    }
  }, [pathname, teamspaces]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between"
        >
          {active ? (
            <span className="truncate">{active}</span>
          ) : (
            <Skeleton className="h-5 w-full" />
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        <DropdownMenuLabel>Teams</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* todo */}
        {teamspaces.map((teamspace) => (
          <DropdownMenuItem key={teamspace.id} asChild>
            <Link
              href={`/app/${teamspace.name}/dashboard`}
              className="justify-between"
            >
              <span className="truncate">{teamspace.name}</span>
              {active === teamspace.name ? (
                <Check className="ml-2 h-4 w-4" />
              ) : null}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
