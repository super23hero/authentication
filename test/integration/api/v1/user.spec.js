/*
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

suite('Users', () => {
  beforeEach(async () => {
    token = await getToken();
  });

  suite('#create', () => {
    test('should create a new user', async () => {
      const name = faker.internet.userName();
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, username, email, password })
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(name);
    });

    test('should fail to create a new user when username is duplicated', async () => {
      const name = faker.internet.userName();
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, username, email, password })
        .expect(201);

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, username, email, password })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: username: Given username is already in use');
    });

    test('should fail to create a new user when name is undefined', async () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ username, email, password })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: User [name] field is required');
    });

    test('should fail to create a new user when username is undefined', async () => {
      const name = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, email, password })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be
      .equal('ValidationError: username: User [username] field is required');
    });

    test('should fail to create a new user when password is undefined', async () => {
      const name = faker.internet.userName();
      const email = faker.internet.email();
      const username = faker.internet.userName();

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, email, username })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be
      .equal('ValidationError: salt: Path
      `salt` is required., hashed_password: User [password] field is required');
    });

    test('should fail to create a new user when name is blank', async () => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const res = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: ' ', username, email, password })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: User [name] field is required');
    });
  });

  suite('#delete', () => {
    test('should delete an user', async () => {
      const name = faker.internet.userName();
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const userInsert = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, username, email, password })
        .expect(201);

      const res = await request(app)
        .delete(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when user does not exist', async () => {
      const res = await request(app)
        .delete('/v1/users/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });
  });

  suite('#update', () => {
    test('should update an user with some variables', async () => {
      const expectName = faker.internet.userName();
      const name = faker.internet.userName();
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password(8);

      const userInsert = await request(app)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, username, email, password })
        .expect(201);

      const res = await request(app)
        .put(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
      res.body.username.should.be.equal(username);
    });
  });

  suite('#list', () => {
    test('should return an array list with Users', async () => {
      const res = await request(app)
        .get('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.should.be.an('array');
    });
  });
});
*/
