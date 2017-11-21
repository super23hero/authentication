const chai = require('chai');
const request = require('supertest');
const faker = require('faker');

const server = require('../../../fixture/server');

chai.should();

let instance;

before(async () => {
  instance = await server();
});

const authHelper = require('./auth.helper');

suite('Auth', () => {
  suite('#token', () => {
    test('should authenticate and return the authenticated token', async () => {
      const res = await authHelper.auth();
      res.body.should.be.an('object');
      res.body.token.should.be.a('string');
    });

    test('should fail to authenticate with an invalid username', async () => {
      const res = await request(instance)
        .post('/v1/auth')
        .send({ username: faker.random.word(), password: faker.random.word() })
        .expect(401);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('Unauthorized');
    });
  });
});
