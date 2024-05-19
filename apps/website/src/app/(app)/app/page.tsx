import { redirect } from "next/navigation";

import { Shell } from "@/components/dashboard/shell";
import { AppHeader } from "@/components/layout/app-header";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  const teamspace = await api.tenant.getTeamspaces.query();

  if (teamspace.length > 0) {
    redirect(`/app/${teamspace[0].name}`);
  }

  return (
    <div className="container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4 lg:p-8">
      <AppHeader />
      <div className="flex w-full flex-1 gap-6 lg:gap-8">
        <main className="z-10 flex w-full flex-1 flex-col items-start justify-center">
          <Shell className="relative flex flex-1 flex-col items-center justify-center">
            <div className="grid gap-4">
              <div className="text-center">
                <p className="mb-1 text-3xl font-semibold">
                  Creating TeamSpace
                </p>
                <p className="text-muted-foreground mb-5 text-xl">
                  Should be done in a second.
                </p>
              </div>
            </div>
          </Shell>
        </main>
      </div>
    </div>
  );
};

export default Page;
