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

suite('Classes', () => {
  suite('#create', () => {
    test('should create a new class', async () => {
      const name = faker.internet.userName();
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(app)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, day_care: dayCare })
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(name);
      res.body.day_care.should.be.equal(dayCare);
    });

    test('should fail to create a new class when name is undefined', async () => {
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(app)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ day_care: dayCare })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: Class [name] field is required');
    });

    test('should fail to create a new class when name is blank', async () => {
      const dayCare = '59c6a58534a4050de012f617';

      const res = await request(app)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: ' ', day_care: dayCare })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: Class [name] field is required');
    });
  });

  suite('#list', () => {
    test('should return an array list with Day care Classes', async () => {
      const res = await request(app)
        .get('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.should.be.an('array');
    });
  });
});
