const chai = require('chai');
const request = require('supertest');
const faker = require('faker');

chai.should();

const app = require('../../../../src/app');
const statusHandler = require('../../../../src/config/statusHandler');
const { getToken } = require('./auth.helper');

// Setup
let token = '';

before(async () => {
  if (statusHandler.getStatus() === statusHandler.STATUSES.READY) {
    return;
  }
  if (statusHandler.getStatus() === statusHandler.STATUSES.ERR) {
    throw new Error('Application crashed');
  }
  await new Promise((resolve, reject) => {
    app.on('ready', resolve);
    app.on('error', reject);
  });
});

beforeEach(async () => {
  token = await getToken();
});

suite('Day Cares', () => {
  suite('#create', () => {
    test('should create a new day care', async () => {
      const name = faker.internet.userName();

      const res = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(name);
    });

    test('should fail to create a new day care when name is duplicated', async () => {
      const name = faker.internet.userName();

      await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      const res = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: Given day care is already in use');
    });

    test('should fail to create a new day care when name is undefined', async () => {
      const res = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: DayCare [name] field is required');
    });

    test('should fail to create a new day care when name is blank', async () => {
      const res = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: ' ' })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: DayCare [name] field is required');
    });
  });

  suite('#delete', () => {
    test('should delete an day care', async () => {
      const name = faker.internet.userName();

      const dayCareInsert = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      const res = await request(app)
        .delete(`/v1/day-cares/${dayCareInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when day care does not exist', async () => {
      const res = await request(app)
        .delete('/v1/day-cares/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });
  });

  suite('#update', () => {
    test('should update an day care with some variables', async () => {
      const expectName = faker.internet.userName();
      const name = faker.internet.userName();

      const dayCareInsert = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      const res = await request(app)
        .put(`/v1/day-cares/${dayCareInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
    });
  });

  suite('#list', () => {
    test('should return an array list with Day Cares', async () => {
      const res = await request(app)
        .get('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.data.should.be.an('array');
    });
  });
});
