import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { AppRouter } from "./src/root";

export { createInnerTRPCContext, createTRPCContext } from "./src/trpc";

export type { AppRouter } from "./src/root";

export { t } from "./src/trpc";

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
