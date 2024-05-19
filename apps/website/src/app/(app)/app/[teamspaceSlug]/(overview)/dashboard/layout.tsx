import type { ReactNode } from "react";

import { Header } from "@/components/dashboard/header";
import { TeamMembersGrid } from "@/components/team-member-grid";
import { api } from "@/trpc/server";

const Layout = async ({
  params,
  children,
}: {
  params: {
    teamspaceSlug: string;
  };
  children: ReactNode;
}) => {
  const teamMembers = await api.teamspace.getUsersInCurrentTeamspace.query();

  return (
    <>
      <Header
        title="Dashboard"
        description="A collaborated overview of all your team members"
        actions={
          <TeamMembersGrid
            teamspaceSlug={params.teamspaceSlug}
            teamMembers={teamMembers}
          />
        }
      />
      {children}
    </>
  );
};

export default Layout;
