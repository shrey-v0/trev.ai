import { notFound } from "next/navigation";

import { Shell } from "@/components/dashboard/shell";
import { AppHeader } from "@/components/layout/app-header";
import { api } from "@/trpc/server";

const AppLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamspaceSlug: string };
}) => {
  const { teamspaceSlug } = params;
  console.log(teamspaceSlug);
  const teamspaces = await api.tenant.getTeamspaces.query();

  if (teamspaces.length === 0) return notFound();
  if (teamspaces.find((w) => w.name === teamspaceSlug) === undefined)
    return notFound();

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4">
      <AppHeader />
      <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
        <Shell className="relative flex-1 overflow-hidden">
          <div className="flex h-full flex-1 flex-col gap-6 md:gap-8">
            {children}
          </div>
        </Shell>
      </main>
      {/* <TeamspaceClientCookie {...{ teamspaceSlug }} /> */}
    </div>
  );
};

export default AppLayout;
