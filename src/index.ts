import express, { Request, Response } from 'express';
import routers from './routes';
import resizeImage from './middleware/images-middleware';
import path from 'path';
const app = express();
const port = 3000;
const imageCachedPath = path.resolve('./src/assets/thumb');
app.get('/', (req: Request, res: Response) => {
  res.send('Please put more /api to get more instructions');
});

app.use('/api', routers);

app.listen(port, () => {
  resizeImage.clearCache(imageCachedPath as string).then((value) => {
    console.log('Clear cache when start server again: ' + value);
  });
  console.log(`Server is running on port ${port}`);
});

export default app;
