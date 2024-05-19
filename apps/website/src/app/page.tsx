import { redirect } from "next/navigation";

import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

const page = async () => {
  const teamspace = await api.tenant.getTeamspaces.query();

  if (teamspace.length > 0) {
    redirect(`/app/${teamspace[0].name}`);
  }
  return <></>;
};

export default page;
