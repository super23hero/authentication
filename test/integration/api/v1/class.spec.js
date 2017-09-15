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
