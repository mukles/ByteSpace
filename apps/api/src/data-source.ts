import { config } from "dotenv";
import { DataSource } from "typeorm";
import { databaseOptions } from "./database.config";

config({ path: [".env.local", ".env"], quiet: true });

export default new DataSource(databaseOptions(process.env.DATABASE_URL));
