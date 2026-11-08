import { bootstrap } from '../app.js';
import { initORMTest } from './testdb.js';
import defineConfig from '../sqlite-mikro-orm.config.js';
import { TestSeeder } from '../seeders/TestSeeder.js';
export async function initTestApp(port: number) {
  // this will create all the ORM services and cache them
  const {orm} =  initORMTest({
    // first, include the main config
    ...defineConfig,
    // no need for debug information, it would only pollute the logs
    debug: false,
    // use in-memory database, this way tests can easily be parallelized
    dbName: ':memory:',
  });

  // create the schema so the database can be used
  await orm.schema.create();
await orm.seeder.seed(TestSeeder);

  const { app } = await bootstrap(port);

  return app;
}