import { join } from "node:path";
import type { DataSourceOptions } from "typeorm";
import { RefreshToken } from "./auth/entities/refresh-token.entity";
import { User } from "./auth/entities/user.entity";

export function databaseOptions(url: string | undefined): DataSourceOptions {
  if (!url) throw new Error("DATABASE_URL is not configured");
  return {
    type: "postgres",
    url,
    entities: [User, RefreshToken],
    migrations: [join(__dirname, "migrations", "*.{ts,js}")],
    synchronize: false,
  };
}
