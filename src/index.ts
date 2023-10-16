import express, { Request, Response } from 'express';
import routers from './routes';
import resizeImage from './middleware/images-middleware';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

const imageCachedPath = path.resolve(__dirname, '../src/assets/thumb');

console.log(imageCachedPath);

// Check if the directory exists, and if not, create it
if (!fs.existsSync(imageCachedPath)) {
  const mkdirResult = fs.mkdirSync(imageCachedPath, { recursive: true });
  if (mkdirResult) {
    console.log('Created path successfully: ' + mkdirResult);
  } else {
    console.error('Cannot create directory: ', imageCachedPath);
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send('Please put more /api to get more instructions');
});

app.use('/api', routers);

app.listen(port, () => {
  resizeImage.clearCache(imageCachedPath as string).then((value: unknown) => {
    console.log('Clear cache when start server again: ' + (value ?? 'Oke'));
  });
  console.log(`Server is running on port ${port}`);
});

export default app;
