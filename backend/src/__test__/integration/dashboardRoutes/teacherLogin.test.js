import request from 'supertest';
import app from '../../../server';

describe('Teacher Endpoints', () => {
  // it('should login', async () => {
  //   const res = await request(app).post('/login').send({
  //     username: 'ra',
  //     password: 'senha',
  //   });
  //   expect(res.statusCode).toEqual(200);
  // });

  it('should fail login', async () => {
    const res = await request(app).post('/login').send({
      username: 'a2135590',
      password: 'senha_errada',
    });
    expect(res.statusCode).toEqual(403);
  });
});

afterAll(() => app.close());
