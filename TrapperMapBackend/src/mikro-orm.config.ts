import { defineConfig} from "@mikro-orm/postgresql";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TrapMarkerSchema } from "./modules/TrapMarker/trapMarker.entity.js";
import 'dotenv/config'
import { SeedManager } from "@mikro-orm/seeder";
import { Migrator } from "@mikro-orm/migrations";
export default defineConfig({
    
      entities: [TrapMarkerSchema],
    // enable debug mode to log SQL queries and discovery information
    debug: true,
    dbName:process.env.DB_NAME,
     user:process.env.USERNAME,
    password:process.env.DB_PASS,
    port:5432,
    driver:PostgreSqlDriver,
    extensions:[SeedManager,Migrator],
    
    

})

