import request from 'supertest';
import app from '../../../server';

describe('Mobile Endpoints', () => {
  it('should create an account -> /student/register', async () => {
    const res = await request(app).post('/student/register').send({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty('student', {
      email: 'teste@gmail.com',
      name: 'Teste',
    });
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should fail create an account with duplicated email -> /student/register', async () => {
    const res = await request(app).post('/student/register').send({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: 'senhanova',
    });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('response', 'E-mail já cadastrado!');
  });

  it('should login sucessfully -> /student/login', async () => {
    const res = await request(app).post('/student/login').send({
      email: 'teste@gmail.com',
      password: '12345678',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveProperty('student', {
      email: 'teste@gmail.com',
      name: 'Teste',
    });
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
  });

  it('should fail login with invalid password -> /student/login', async () => {
    const res = await request(app).post('/student/login').send({
      email: 'teste@gmail.com',
      password: 'wrong_pass',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('response', 'Senha Incorreta!');
  });

  it('should fail login with invalid email -> /student/login', async () => {
    const res = await request(app).post('/student/login').send({
      email: 'invalido@gmail.com',
      password: '12345678',
    });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('response', 'E-mail Inválido!');
  });
});

afterAll(() => app.close());
