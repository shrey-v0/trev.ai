import type { Activities } from "@trev/api/src/router";
import type { TUser } from "@trev/db/src/schema";

import { Header } from "@/components/dashboard/header";
import ActivityBar from "@/components/team-members/activity-bar";
import { columns } from "@/components/team-members/columns";
import { DataTable } from "@/components/team-members/data-table";
import type { Merge } from "@/lib/utils";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

const Page = async () => {
  const teamMembers = await api.user.getUsersInCurrentTeamspace.query();

  const UserWithActivities = teamMembers.activities.map((activity) => {
    return {
      ...teamMembers.currentTeam.find((user) => user.id === activity.user_id),
      ...activity,
    } as Merge<TUser, Activities>;
  });

  return (
    <>
      <Header
        title="Team Members"
        description="Latest information about all team members"
      />
      <ActivityBar />
      <DataTable columns={columns} data={UserWithActivities} />
    </>
  );
};

export default Page;
