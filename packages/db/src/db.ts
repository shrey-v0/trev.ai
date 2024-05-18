import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "../env.mjs";
import * as schema from "./schema";

config();

//envs not working

const sql = neon(env.DRIZZLE_DATABASE_URL);

console.log(sql);

export const db = drizzle(sql, { schema });
