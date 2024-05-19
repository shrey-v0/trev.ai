import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
const DashboardRedirect = ({
  params,
}: {
  params: { teamspaceSlug: string };
}) => {
  return redirect(`/app/${params.teamspaceSlug}/dashboard`);
};

export default DashboardRedirect;
