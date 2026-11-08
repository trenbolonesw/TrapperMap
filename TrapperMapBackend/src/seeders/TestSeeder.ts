import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TrapMarkerSchema } from '../modules/TrapMarker/trapMarker.entity.js';
import { TrapCategory } from '../modules/TrapMarker/trapMarker.entity.js';
export class TestSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    em.create(TrapMarkerSchema,{
      trapCategory:TrapCategory.CONNIBEAR,
      isChecked:false,
      latitude:10.8888833,
      longitude:-23.6443333
    })
  }
        
}
