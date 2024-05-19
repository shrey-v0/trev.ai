import type { LinkProps } from "next/link";
import Link from "next/link";
import Avatar from "boring-avatars";
import { ArrowRightFromLine } from "lucide-react";

import type { TUser } from "@trev/db/src/schema";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Skeleton,
} from "@trev/ui";

import { cn } from "@/lib/utils";

export interface TeamMembersGridProps extends Omit<LinkProps, "href"> {
  className?: string;
  teamspaceSlug: string;
  teamMembers: TUser[];
}

const TeamMembersGrid = ({
  teamspaceSlug,
  teamMembers,
  ...props
}: TeamMembersGridProps) => {
  return (
    <Link
      href={`/app/${teamspaceSlug}/team-members`}
      className={cn("flex min-w-fit items-center", props.className)}
      {...props}
    >
      <div className="flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-white dark:[&>span]:ring-gray-950">
        {teamMembers.map((member) => (
          <HoverCard key={member.email} openDelay={10} closeDelay={10}>
            <HoverCardTrigger asChild>
              <Avatar size={32} name={member.email} variant="beam" />
            </HoverCardTrigger>
            <HoverCardContent className="max-w-fit">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{member.email}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.user_type}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
      <ArrowRightFromLine className="ml-1 h-4 w-4" />
    </Link>
  );
};

const TeamMembersSkeleton = () => (
  <div className="flex items-center -space-x-1 [&>span]:ring-4 [&>span]:ring-white dark:[&>span]:ring-gray-950">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
);

TeamMembersGrid.Skeleton = TeamMembersSkeleton;

export { TeamMembersGrid };
