import request from 'supertest';
import { app } from '../../app';
import { response } from 'express';

it('Returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('Returns a 400 whith an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'fafdfdsfsd',
      password: 'password',
    })
    .expect(400);
});

it('Returns a 400 whith an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@haha.com',
      password: 'p',
    })
    .expect(400);
});

it('Returns a 400 whith missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'hacsahcsah',
    })
    .expect(400);
});

it('disallows dublicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after succesful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
