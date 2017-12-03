const chai = require('chai');
const request = require('supertest');
const faker = require('faker');

const server = require('../../../fixture/server');
const { getToken } = require('./auth.helper');

chai.should();

let instance;
let token = '';
const childInstance = {};

before(async () => {
  instance = await server();
});

beforeEach(async () => {
  token = await getToken();

  childInstance.name = faker.internet.userName();
  childInstance.nickname = faker.internet.userName();
  childInstance.sex = 'm';
  childInstance.age = faker.random.number();
  childInstance.photo = faker.image.avatar();
  childInstance.toy = {
    status: 'willReceive',
    wish: faker.random.word(),
  };
  childInstance.cloth = {
    status: 'willReceive',
    size: faker.random.word(),
  };
  childInstance.shoe = {
    status: 'willReceive',
    size: faker.random.word(),
  };
  childInstance.class = '59c6a58534a4050de012f617';
});

suite('Children', () => {
  suite('#list', () => {
    test('should return an array list with children', async () => {
      const res = await request(instance)
        .get('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.should.be.an('array');
    });
  });

  suite('#create', () => {
    test('should create a new child', async () => {
      const res = await request(instance)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send(childInstance)
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(childInstance.name);
      res.body.class.should.be.equal(childInstance.class);
    });

    test('should fail to create a new class when class is undefined', async () => {
      childInstance.class = undefined;

      const res = await request(instance)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send(childInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: class: Child [class] field is required');
    });
  });

  suite('#update', () => {
    test('should update an child with some variables', async () => {
      const expectName = faker.internet.userName();

      const dayCareInsert = await request(instance)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: faker.internet.userName() })
        .expect(201);

      const classInsert = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: faker.internet.userName(), day_care: dayCareInsert.body._id })
        .expect(201);

      childInstance.class = classInsert.body._id;

      const childInsert = await request(instance)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send(childInstance)
        .expect(201);

      const res = await request(instance)
        .put(`/v1/children/${childInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
    });
  });

  suite('#delete', () => {
    test('should delete an child', async () => {
      const childInsert = await request(instance)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send(childInstance)
        .expect(201);

      const res = await request(instance)
        .delete(`/v1/children/${childInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when class does not exist', async () => {
      const res = await request(instance)
        .delete('/v1/children/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });
  });
});
