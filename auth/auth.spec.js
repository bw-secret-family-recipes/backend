const Users = require('./auth-model');
const db = require('../data/dbConfig');

it('should set a testing environment', () => {
     expect(process.env.NODE_ENV).toBe('test');
});

describe('user model', () => {
     beforeEach(async () => {
          await db('users').truncate();
     });

     describe('insert', () => {
          it('should add a user to the database', async () => {
               const record = await db('users');
               expect(record).toHaveLength(0);

               await Users.add({ first_name: 'test', last_name: 'test', username: 'test', password: 'test', email: 'test' });
          });
     });

     it('should add the provided user to database', async () => {
          let user = await Users.add({ first_name: 'test1', last_name: 'test1', username: 'test1', password: 'test1', email: 'test1' });
          expect(user.username).toBe('test1');

          user = await Users.add({ first_name: 'test2', last_name: 'test2', username: 'test2', password: 'test2', email: 'test2' });
          expect(user.username).toBe('test2');

          const people = await db('users');
          expect(people).toHaveLength(2)
     })
})

