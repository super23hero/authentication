const request = require('supertest');
const app = require('../../../../src/app');

let globalToken = '';

exports.getToken = async (username = 'involves', password = 'admin') => {
  if (globalToken) return globalToken;
  const res = await this.auth(username, password);
  globalToken = res.body.token;
  return res.body.token;
};

exports.auth = async (username = 'involves', password = 'admin') => {
  const res = await request(app)
    .post('/v1/auth')
    .send({ username, password })
    .expect(200);

  globalToken = res.body.token;
  return res;
};
