const chai = require('chai');
const request = require('supertest');
const faker = require('faker');

const server = require('../../../fixture/server');
const { getToken, getUserToken } = require('./auth.helper');

chai.should();

let instance;
let token = '';
const userInstance = {};

before(async () => {
  instance = await server();
});

beforeEach(async () => {
  token = await getToken();

  userInstance.name = faker.internet.userName();
  userInstance.username = faker.internet.userName();
  userInstance.email = faker.internet.email();
  userInstance.password = faker.internet.password(8);
  userInstance.isAdmin = false;
});

suite('Users', () => {
  suite('#list', () => {
    test('should return an array list with Users', async () => {
      const res = await request(instance)
        .get('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.should.be.an('array');
    });
  });

  suite('#create', () => {
    test('should create a new user', async () => {
      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(userInstance.name);
    });

    test('should fail to create a new user when username is duplicated', async () => {
      await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: username: Given username is already in use');
    });

    test('should fail to create a new user when name is undefined', async () => {
      userInstance.name = undefined;

      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: User [name] field is required');
    });

    test('should fail to create a new user when username is undefined', async () => {
      userInstance.username = undefined;

      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: username: User [username] field is required');
    });

    test('should fail to create a new user when password is undefined', async () => {
      userInstance.password = undefined;

      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be
        .equal('ValidationError: salt: Path `salt` is required., hashed_password: User [password] field is required');
    });

    test('should fail to create a new user when name is blank', async () => {
      userInstance.name = ' ';

      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: name: User [name] field is required');
    });

    test('should fail to create a new user when logged user does not have admin permission', async () => {
      await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const userToken = await getUserToken(userInstance.username, userInstance.password);
      const newUser = {
        name: faker.internet.userName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
      };
      const res = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newUser)
        .expect(401);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('Current action can only be performed by an administrator');
    });
  });

  suite('#update', () => {
    test('should update an user with some variables', async () => {
      const expectName = faker.internet.userName();

      const userInsert = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const res = await request(instance)
        .put(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
    });

    test('should fail to update a user when logged user does not have admin permission', async () => {
      const userInsert = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const userToken = await getUserToken(userInstance.username, userInstance.password);
      const res = await request(instance)
        .put(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: faker.internet.userName() })
        .expect(401);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('Current action can only be performed by an administrator');
    });
  });

  suite('#delete', () => {
    test('should delete an user', async () => {
      const userInsert = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const res = await request(instance)
        .delete(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when user does not exist', async () => {
      const res = await request(instance)
        .delete('/v1/users/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should fail to delete a user when logged user does not have admin permission', async () => {
      const userInsert = await request(instance)
        .post('/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .send(userInstance)
        .expect(201);

      const userToken = await getUserToken(userInstance.username, userInstance.password);
      const res = await request(instance)
        .delete(`/v1/users/${userInsert.body._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('Current action can only be performed by an administrator');
    });
  });
});
