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

suite('Children', () => {
  suite('#create', () => {
    test('should create a new child', async () => {
      const name = faker.internet.userName();
      const nickname = faker.internet.userName();
      const sex = 'm';
      const age = faker.random.number();
      const photo = faker.image.avatar();
      const toy = {
        status: 'willReceive',
        wish: faker.random.word(),
      };
      const cloth = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const shoe = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const classId = '59c6a58534a4050de012f617';

      const res = await request(app)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, nickname, sex, age, photo, toy, cloth, shoe, class: classId })
        .expect(201);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(name);
      res.body.class.should.be.equal(classId);
    });

    test('should fail to create a new class when class is undefined', async () => {
      const name = faker.internet.userName();
      const nickname = faker.internet.userName();
      const sex = 'm';
      const age = faker.random.number();
      const photo = faker.image.avatar();
      const toy = {
        status: 'willReceive',
        wish: faker.random.word(),
      };
      const cloth = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const shoe = {
        status: 'willReceive',
        size: faker.random.word(),
      };

      const res = await request(app)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, nickname, sex, age, photo, toy, cloth, shoe })
        .expect(500);

      res.body.should.be.an('object');
      res.body.error.should.be.equal('ValidationError: class: Child [class] field is required');
    });
  });

  suite('#delete', () => {
    test('should delete an child', async () => {
      const name = faker.internet.userName();
      const nickname = faker.internet.userName();
      const sex = 'm';
      const age = faker.random.number();
      const photo = faker.image.avatar();
      const toy = {
        status: 'willReceive',
        wish: faker.random.word(),
      };
      const cloth = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const shoe = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const classId = '59c6a58534a4050de012f617';

      const childInsert = await request(app)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, nickname, sex, age, photo, toy, cloth, shoe, class: classId })
        .expect(201);

      const res = await request(app)
        .delete(`/v1/children/${childInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });

    test('should succeed even when class does not exist', async () => {
      const res = await request(app)
        .delete('/v1/children/598ce31fd826193bbe675726')
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      res.body
        .should.be.an('object')
        .that.is.empty;
    });
  });

  suite('#update', () => {
    test('should update an child with some variables', async () => {
      const expectName = faker.internet.userName();
      const name = faker.internet.userName();
      const nickname = faker.internet.userName();
      const sex = 'm';
      const age = faker.random.number();
      const photo = faker.image.avatar();
      const toy = {
        status: 'willReceive',
        wish: faker.random.word(),
      };
      const cloth = {
        status: 'willReceive',
        size: faker.random.word(),
      };
      const shoe = {
        status: 'willReceive',
        size: faker.random.word(),
      };

      const dayCareInsert = await request(app)
        .post('/v1/day-cares')
        .set('Authorization', `Bearer ${token}`)
        .send({ name })
        .expect(201);

      const classInsert = await request(app)
        .post('/v1/classes')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, day_care: dayCareInsert.body._id })
        .expect(201);

      const childInsert = await request(app)
        .post('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .send({ name, nickname, sex, age, photo, toy, cloth, shoe, class: classInsert.body._id })
        .expect(201);

      const res = await request(app)
        .put(`/v1/children/${childInsert.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectName })
        .expect(200);

      res.body.should.be.an('object');
      res.body.name.should.be.equal(expectName);
    });
  });

  suite('#list', () => {
    test('should return an array list with children', async () => {
      const res = await request(app)
        .get('/v1/children')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      res.body.should.be.an('array');
    });
  });
});
