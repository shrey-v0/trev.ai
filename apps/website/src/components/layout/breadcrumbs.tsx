"use client";

import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { SelectTeam } from "./select-teamname";

export const Breadcrumbs = () => {
  const params = useParams();
  return (
    <div className="flex items-center">
      <Link href="/app" className="shrink-0">
        <Image
          src="/icon.svg"
          alt="Trev logo"
          height={30}
          width={30}
          className="border-border rounded-full border"
        />
      </Link>
      <Slash className="text-muted-foreground ml-2.5 mr-0.5 h-4 w-4 -rotate-12" />
      {params.teamspaceSlug ? (
        <div className="w-40">
          <SelectTeam
            teamspaces={[
              {
                id: 1,
                name: "frontend",
                tenant_id: 1,
              },
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};
