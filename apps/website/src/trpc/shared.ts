/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import type { HTTPBatchLinkOptions, HTTPHeaders, TRPCLink } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@trev/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const endingLink = (opts?: {
  headers?: HTTPHeaders | (() => HTTPHeaders);
}) =>
  ((runtime) => {
    const sharedOpts = {
      headers: opts?.headers,
    } satisfies Partial<HTTPBatchLinkOptions>;

    const link = httpBatchLink({
      ...sharedOpts,
      url: `${getBaseUrl()}/api/trpc/`,
    })(runtime);

    return (ctx) => {
      console.log("ctx.op.path", ctx.op.path);
      const newCtx = {
        ...ctx,
        op: { ...ctx.op, path: ctx.op.path.split(".").join(".") },
      };
      return link(newCtx);
    };
  }) satisfies TRPCLink<AppRouter>;
