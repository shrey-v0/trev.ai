"use client";

import { useEffect } from "react";

export function TeamspaceClientCookie({
  teamspaceSlug,
}: {
  teamspaceSlug: string;
}) {
  console.log(teamspaceSlug);
  useEffect(() => {
    if (document) {
      document.cookie = `teamspace-slug=${teamspaceSlug}; path=/`;
    }
  }, [teamspaceSlug]);
  return null;
}
