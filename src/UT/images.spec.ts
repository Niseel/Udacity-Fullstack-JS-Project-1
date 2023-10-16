import supertest from 'supertest';
import app from '../index';
import path from 'path';
import imageMiddleware from '../middleware/images-middleware';
import fs from 'fs';

const request = supertest(app);
const imagePath = path.resolve('./src/assets');

// Check if the directory exists, and if not, create it
if (!fs.existsSync(imagePath)) {
  const mkdirResult = fs.mkdirSync(imagePath, { recursive: true });
  if (mkdirResult) {
    console.log('Created path successfully: ' + mkdirResult);
  } else {
    console.error('Cannot create directory: ', imagePath);
  }
}

describe('Test /images endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images?fileName=emotional&width=600&height=300'
    );
    expect(response.statusCode).toBe(200);
  });

  it('Test resize function that create new image', async () => {
    const cacheFile = path.resolve(`${imagePath}/thumb/emotional-600-300.png`);
    const isExist: boolean = imageMiddleware.checkFileExist(cacheFile);
    if (isExist) {
      fs.unlinkSync(cacheFile);
    }
    const newWidth = 600;
    const newHeight = 400;

    await imageMiddleware.resizeFile(
      'emotional' as string,
      newWidth as number,
      newHeight as number
    );

    const newFilePath = path.resolve(
      `${imagePath}/thumb/emotional-${newWidth}-${newHeight}.png`
    );
    expect(imageMiddleware.checkFileExist(newFilePath)).toBeTrue();
  });
});
