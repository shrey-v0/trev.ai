import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config();

export const env = createEnv({
  server: {
    DRIZZLE_DATABASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    DRIZZLE_DATABASE_URL: process.env.DATABASE_URL,
  },
});
