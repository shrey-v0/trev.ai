import { config } from "dotenv";

import { env } from "./env.mjs";

import "dotenv/config";

import type { Config } from "drizzle-kit";

config();

console.log(env.DRIZZLE_DATABASE_URL);

export default {
  schema: "./src/schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DRIZZLE_DATABASE_URL,
  },
  strict: true,
} satisfies Config;
