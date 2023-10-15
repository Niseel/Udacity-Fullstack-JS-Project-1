import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responsese', () => {
  //I dont know the video is out of update or, but if I follow to the video
  // and put done and call callback done() in the last there will be an error
  it('gets the / endpoint when user dont put the path and the code still run', async () => {
    const response = await request.get('/');
    expect(response.statusCode).toBe(200);
  });
  it('gets the /api endpoint when user dont put the path and the code still run', async () => {
    const response = await request.get('/api');
    expect(response.statusCode).toBe(200);
  });
});
