import { headers } from "next/headers";
import { createTRPCProxyClient } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@trev/api";

import { endingLink } from "./shared";

export const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    endingLink({
      headers: () => {
        const h = new Map(headers());
        h.delete("connection");
        h.delete("transfer-encoding");
        h.set("x-trpc-source", "server");
        return Object.fromEntries(h.entries());
      },
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@trev/api";
