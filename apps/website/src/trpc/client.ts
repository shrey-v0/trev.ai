import { createTRPCProxyClient } from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@trev/api";

import { endingLink } from "./shared";

export const api = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    endingLink({
      headers: {
        "x-trpc-source": "client",
      },
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from "@trev/api";
