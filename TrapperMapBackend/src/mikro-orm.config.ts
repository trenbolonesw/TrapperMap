import { defineConfig as config} from "@mikro-orm/core";
import { TrapMarkerSchema } from "./modules/TrapMarker/trapMarker.entity.js";

export default config({
    dbName:'TrapperMap',
    entities:[TrapMarkerSchema],
    // enable debug mode to log SQL queries and discovery information
    debug: true,
     user:'jessewlr',
    password:'KingCobra1984',
    port:5432,
})