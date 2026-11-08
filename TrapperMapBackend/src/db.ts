import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/postgresql';
import { TrapMarkerSchema } from './modules/TrapMarker/trapMarker.entity.js';
import config from './mikro-orm.config.js'


export interface Services {
    orm:MikroORM,
    em:EntityManager,
    TrapMarker:EntityRepository<TrapMarkerSchema>
}

let cache: Services;

export async function initORM(options?: Partial<Options>): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init({
    ...config,
    ...options,
  });

  return (cache = {
    orm,
    em:orm.em,
    TrapMarker:orm.em.getRepository(TrapMarkerSchema)
  })

}