const chai = require('chai');
const request = require('supertest');
const faker = require('faker');

const server = require('../../../fixture/server');
const { getToken } = require('./auth.helper');

chai.should();

let instance;
let token = '';

before(async () => {
  instance = await server();
});

beforeEach(async () => {
  token = await getToken();
});

suite('Classes', () => {
  suite('#create', () => {
    test('should create a new class', async () => {
      const name = faker.internet.userName();
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, day_care: dayCare })
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(name);
      res.body.day_care.should.be.equal(dayCare);
    });

    test('should fail to create a new class when day_care is undefined', async () => {
      const name = faker.internet.userName();

      const res = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error
        .should.be.equal('ValidationError: day_care: Class [day_care] field is required');
    });

    test('should fail to create a new class when name is undefined', async () => {
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ day_care: dayCare })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: Class [name] field is required');
    });

    test('should fail to create a new class when name is blank', async () => {
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: ' ', day_care: dayCare })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: Class [name] field is required');
    });
  });

  suite('#delete', () => {
    test('should delete an class', async () => {
      const name = faker.internet.userName();
      const dayCare = '59c6a58534a4050de012f617';

      const classInsert = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, day_care: dayCare })
        .expect(201);

      const res = await request(instance)
        .delete(`/v1/classes/${classInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when class does not exist', async () => {
      const res = await request(instance)
        .delete('/v1/classes/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });
  });

  suite('#update', () => {
    test('should update an class with some variables', async () => {
      const expectName = faker.internet.userName();
      const name = faker.internet.userName();

      const dayCareInsert = await request(instance)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      const classInsert = await request(instance)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, day_care: dayCareInsert.body._id })
        .expect(201);

      const res = await request(instance)
        .put(`/v1/classes/${classInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
    });
  });

  suite('#list', () => {
    test('should return an array list with Day care Classes', async () => {
      const res = await request(instance)
        .get('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.data.should.be.an('array');
    });
  });
});
