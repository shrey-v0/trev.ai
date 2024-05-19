import type { LinkProps } from "next/link";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

const pagesConfig = [
  {
    title: "Dashboard",
    segment: "dashboard",
    href: "/dashboard",
  },
  {
    title: "Team Members",
    segment: "team-members",
    href: "/team-members",
  },
  {
    title: "Incidents",
    segment: "incidents",
    href: "/incidents",
  },
];

export const AppTabs = () => {
  const params = useParams();
  const selectedSegment = useSelectedLayoutSegment();

  if (!params?.teamspaceSlug) return null;

  return (
    <nav className="mt-2 flex items-center">
      <ul className="-mb-3 flex flex-row">
        <>
          {pagesConfig.map(({ title, segment, href }) => {
            const active = segment === selectedSegment;
            return (
              <TabsLink
                key={title}
                active={active}
                href={`/app/${params?.teamspaceSlug}${href}`}
              >
                {title}
              </TabsLink>
            );
          })}
        </>
      </ul>
    </nav>
  );
};

export interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  disabled?: boolean;
}

const TabsLink = ({
  children,
  active,
  className,
  disabled,
  ...props
}: NavLinkProps) => {
  return (
    <li
      className={cn("flex shrink-0 list-none border-b-2 border-transparent", {
        "border-primary": active,
        "pointer-events-none opacity-70": disabled,
      })}
    >
      <Link
        className={cn(
          "text-muted-foreground hover:text-primary rounded-md px-4 pb-3 pt-2 text-sm font-medium",
          {
            "text-primary": active,
          },
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
};
