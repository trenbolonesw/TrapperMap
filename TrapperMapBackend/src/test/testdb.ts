import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/sqlite';
import { TrapMarkerSchema } from '../modules/TrapMarker/trapMarker.entity.js';
import defineConfig from '../sqlite-mikro-orm.config.js';


export interface Services {
    orm:MikroORM,
    em:EntityManager,
    TrapMarker:EntityRepository<TrapMarkerSchema>
}

let cache: Services;

export function initORMTest(options?: Partial<Options>):Services {
  if (cache) {
    return cache;
  }

  const orm = new MikroORM({
    ...defineConfig,
    ...options,
  });

  return (cache = {
    orm,
    em:orm.em,
    TrapMarker:orm.em.getRepository(TrapMarkerSchema)
  })

}