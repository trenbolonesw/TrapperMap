import { MikroORM } from "@mikro-orm/postgresql";
import config from './mikro-orm.config.js'
import { TrapMarkerSchema } from "./modules/TrapMarker/trapMarker.entity.js";
import { TrapCategory } from "./modules/TrapMarker/trapMarker.entity.js";
const orm = await MikroORM.init(config);

const em = orm.em.fork();
// create new user entity instance via em.create()
const user = em.create(TrapMarkerSchema, {
  trapCategory:TrapCategory.CONNIBEAR,
  isChecked:true,
});
await orm.schema.refresh();
// em.create() auto-persists, so just flush
await em.flush();

// after the entity is flushed, it becomes managed, and has the PK available
console.log('user id is:', user.id);