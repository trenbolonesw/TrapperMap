
import { defineConfig, SqliteDriver } from "@mikro-orm/sqlite";
import { TrapMarkerSchema } from "./modules/TrapMarker/trapMarker.entity.js";
import 'dotenv/config'
import { SeedManager } from "@mikro-orm/seeder";

export default defineConfig({
     
      entities: [TrapMarkerSchema],
    // enable debug mode to log SQL queries and discovery information
    debug: true,
    dbName:process.env.SQLITE_DB_NAME,
     user:process.env.USERNAME,
    password:process.env.DB_PASS,
    port:5432,
    driver:SqliteDriver,
    extensions:[SeedManager],
    
    

})

