import {  RequestContext } from '@mikro-orm/core';
import { fastify } from 'fastify';
import { initORM } from './db.js';
import { TrapCategory, TrapMarkerSchema } from './modules/TrapMarker/trapMarker.entity.js';
export async function bootstrap(port = 3001) {
  const db = await initORM();
  const app = fastify();

  // register request context hook
  app.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done);
  });

  // shut down the connection when closing the app
  app.addHook('onClose', async () => {
    await db.orm.close();
  });

  // register routes here
  app.get('/traps', async request => {
    const { limit, offset } = request.query as { limit?: number; offset?: number };
    const [items, total] = await db.TrapMarker.findAndCount({}, {
      limit, offset,
    });

    return { items, total };
  });

  type reqBody = {
   
    trapCategory:TrapCategory,
   latitude:number,
   longitude:number,
   isChecked:boolean
  }

  app.post('/newTrap', async request => {
    const {trapCategory,
          latitude,
            longitude,isChecked} = request.body as reqBody

            const newTrap =  db.TrapMarker.create({
             trapCategory:trapCategory,
             latitude:latitude,
             longitude:longitude,
             isChecked:isChecked 
            })
              await db.em.flush()
            return newTrap
  })


  app.put<{ Params: { id: number } }>('/editTrap/:id',async request => {
     const {
      
      trapCategory,
          latitude,
            longitude,
          isChecked
          } = request.body as reqBody

              const {id} = request.params

          const trap = db.TrapMarker.findOneOrFail({id:id})  

            

          const updatedTrap = db.em.nativeUpdate(
            TrapMarkerSchema,
            {id},
            {
            trapCategory:trapCategory,
            latitude:latitude,
            longitude:longitude,
            isChecked:isChecked
          })

          await db.em.flush()
          return updatedTrap
  })


  app.delete<{ Params: { id: number } }>(('/:id'),async request => {
         const {id} = request.params

          const trap = db.TrapMarker.findOneOrFail({id:id})  
           
          db.em.nativeDelete(
            TrapMarkerSchema,
            id,
          
          )
          return trap
          
  })

  const url = await app.listen({ port });

  return { app, url };
}