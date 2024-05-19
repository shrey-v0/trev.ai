import { Siren } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Header } from "@/components/dashboard/header";
import { columns } from "@/components/incident/columns";
import { DataTable } from "@/components/incident/data-table";
import { api } from "@/trpc/server";

export const dynamic = 'force-dynamic';
export default async function IncidentPage() {
  const incidents = await api.incidents.getAllIncidentsInTeamspace.query();

  if (incidents.length === 0)
    return (
      <EmptyState
        icon={<Siren />}
        title="No incidents"
        description="Hopefully you will see this screen for a long time."
        action={undefined}
      />
    );

  return (
    <>
      <Header
        title="Incidents"
        description={
          <div className="text-muted-foreground flex flex-wrap items-center gap-2">
            <span className="max-w-xs truncate text-xs md:max-w-md">
              No recents and active incidents
            </span>
            <span className="text-muted-foreground/50 text-xs">•</span>
            <span className="text-xs">Last updated 1h ago</span>
            <span className="text-muted-foreground/50 text-xs">•</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/80 opacity-75 duration-1000" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500/80" />
            </span>
          </div>
        }
      />
      <DataTable columns={columns} data={incidents} />
    </>
  );
}
